// Email renderer. Loads HTML templates from ./email-templates/ at module init
// (Node caches them for the lifetime of the serverless instance) and performs
// safe placeholder substitution.
//
// Placeholder syntax (Mustache-style):
//   {{var}}    — value is HTML-escaped before insertion (safe default)
//   {{{var}}}  — value is inserted raw (use only for pre-rendered HTML fragments,
//                e.g. message_html which is already escaped + nl2br'd)
//
// Substitution is single-pass, so raw-inserted content is NOT re-scanned for
// placeholders. A user submitting a message containing literal "{{name}}" will
// render that text verbatim, not as a recursive substitution.
//
// OTP emails are localized — strings come from public/locales/{lang}.json so the
// recipient gets the email in whatever language they had selected on the site.
// The owner-notification email stays English (the audience is the site owner).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "email-templates");
const LOCALES_DIR = path.join(process.cwd(), "public", "locales");

const SUPPORTED_LANGS = ["en", "es", "fr", "ta", "zh"];
const DEFAULT_LANG = "en";

const SENDER_NAME = "Manoj A";
const SENDER_TAGLINE = "Software Developer";

function readTemplate(name) {
    return fs.readFileSync(path.join(TEMPLATES_DIR, name), "utf8");
}

// Cache HTML templates at module load — one read per process lifetime.
const TEMPLATE_OTP = readTemplate("otp.html");
const TEMPLATE_CONTACT = readTemplate("contact.html");

// Lazy-loaded, per-language locale cache.
const localeCache = {};
function loadLocale(lang) {
    if (localeCache[lang]) return localeCache[lang];
    try {
        localeCache[lang] = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, `${lang}.json`), "utf8"));
    } catch (e) {
        console.warn(`[email] failed to load locale '${lang}':`, e?.message || e);
        localeCache[lang] = {};
    }
    return localeCache[lang];
}

// Accept a user-supplied language string and clamp to a known one, defaulting to English.
// Strips region tags ("en-US" → "en") and only allows our supported set.
export function normalizeLang(lang) {
    if (typeof lang !== "string") return DEFAULT_LANG;
    const short = lang.split(/[-_]/)[0].toLowerCase();
    return SUPPORTED_LANGS.includes(short) ? short : DEFAULT_LANG;
}

// Translate a key into the requested language with {{var}} interpolation.
// Falls back to English if the key is missing in the requested language;
// falls back to the key itself if missing in English too (to make typos visible).
function t(lang, key, vars = {}) {
    const locale = loadLocale(lang);
    let s = locale[key];
    if (s == null && lang !== DEFAULT_LANG) {
        s = loadLocale(DEFAULT_LANG)[key];
    }
    if (typeof s !== "string") return key;
    return s.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] == null ? "" : String(vars[k])));
}

function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function applyTemplate(template, vars) {
    return template.replace(/\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}/g, (_, rawKey, escKey) => {
        if (rawKey != null) {
            const v = vars[rawKey];
            return v == null ? "" : String(v);
        }
        const v = vars[escKey];
        return v == null ? "" : escapeHtml(String(v));
    });
}

function nl2br(s) {
    return escapeHtml(s).replace(/\n/g, "<br>");
}

export function renderOtpEmail({ code, ttlMinutes = 10, lang = DEFAULT_LANG }) {
    const safeCode = String(code).replace(/\D/g, "").slice(0, 6);
    const language = normalizeLang(lang);
    const tagline = t(language, "portfolio.about.me.role") || SENDER_TAGLINE;

    const i18nVars = { code: safeCode, minutes: ttlMinutes, senderName: SENDER_NAME };
    const subject = t(language, "portfolio.email.otp.subject", i18nVars);
    const preheader = t(language, "portfolio.email.otp.preheader", i18nVars);

    const text = [
        t(language, "portfolio.email.otp.text.code_is"),
        "",
        `    ${safeCode}`,
        "",
        t(language, "portfolio.email.otp.text.expiry", i18nVars),
        "",
        t(language, "portfolio.email.otp.text.requested"),
        t(language, "portfolio.email.otp.text.ignore"),
        "",
        `— ${SENDER_NAME}`,
    ].join("\n");

    const html = applyTemplate(TEMPLATE_OTP, {
        title: subject,
        preheader,
        senderName: SENDER_NAME,
        senderTagline: tagline,
        heading: t(language, "portfolio.email.otp.heading"),
        intro: t(language, "portfolio.email.otp.intro", i18nVars),
        disclaimer: t(language, "portfolio.email.otp.disclaimer"),
        signoff: t(language, "portfolio.email.otp.signoff", i18nVars),
        footer: t(language, "portfolio.email.otp.footer"),
        code: safeCode,
    });

    return { subject, text, html };
}

export function renderContactEmail({ name, email, categoryLabel, message }) {
    const safeName = String(name).replace(/[\r\n]/g, "").trim();
    const safeSubjectName = safeName.length > 40 ? safeName.slice(0, 40) + "…" : safeName;
    const subject = `Portfolio Contact [${categoryLabel}]: ${safeSubjectName}`;
    const preheader = `New contact form message from ${safeName} (${categoryLabel}).`;

    const text = [
        "New message from your portfolio contact form.",
        "",
        `Name:     ${safeName}`,
        `Email:    ${email} (verified)`,
        `Category: ${categoryLabel}`,
        "",
        "Message:",
        message,
        "",
        "—",
        "Reply directly to this email to respond to the sender.",
    ].join("\n");

    const html = applyTemplate(TEMPLATE_CONTACT, {
        title: subject,
        preheader,
        senderName: SENDER_NAME,
        senderTagline: SENDER_TAGLINE,
        name: safeName,
        email,
        categoryLabel,
        message_html: nl2br(message),
    });

    return { subject, text, html };
}

// Display names used in the From: header. Kept ASCII-only for deliverability.
export const FROM_NAME_OTP = SENDER_NAME;
export const FROM_NAME_CONTACT = "Portfolio Contact";
