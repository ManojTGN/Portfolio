import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "email-templates");
const LOCALES_DIR = path.join(process.cwd(), "public", "locales");

const SUPPORTED_LANGS = ["en", "es", "fr", "ta", "zh"];
const DEFAULT_LANG = "en";

const SENDER_NAME = "Manoj A";
const SENDER_TAGLINE = "Software Engineer";

function readTemplate(name) {
    return fs.readFileSync(path.join(TEMPLATES_DIR, name), "utf8");
}

const TEMPLATE_OTP = readTemplate("otp.html");
const TEMPLATE_CONTACT = readTemplate("contact.html");

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

export function normalizeLang(lang) {
    if (typeof lang !== "string") return DEFAULT_LANG;
    const short = lang.split(/[-_]/)[0].toLowerCase();
    return SUPPORTED_LANGS.includes(short) ? short : DEFAULT_LANG;
}

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

// {{{var}}} = raw, {{var}} = escaped. Single-pass so user text can't recurse.
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
    return escapeHtml(s).replace(/\r\n?/g, "\n").replace(/\n/g, "<br>");
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
        SENDER_NAME,
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
    const preheader = `A pigeon arrived from ${safeName} (${categoryLabel}).`;

    const text = [
        "A pigeon was dispatched.",
        "",
        `Name:     ${safeName}`,
        `Email:    ${email} (verified)`,
        `Category: ${categoryLabel}`,
        "",
        "Message:",
        message,
        "",
        "Hit Reply All on this email to respond directly. This keeps both Manoj and the sender in the conversation.",
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

export const FROM_NAME_OTP = SENDER_NAME;
export const FROM_NAME_CONTACT = "Portfolio Contact";
