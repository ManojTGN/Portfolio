import crypto from "crypto";
import nodemailer from "nodemailer";
import { SignJWT, jwtVerify } from "jose";

export const ALLOWED_CATEGORIES = {
    project: "Project Inquiry",
    job: "Job Opportunity",
    collab: "Collaboration",
    feedback: "Feedback",
    other: "Other",
};

export const OTP_TTL_SECONDS = 600;
export const RESEND_COOLDOWN_SECONDS = 60;

const MAX_LOCAL = 64;
const MAX_DOMAIN = 253;
const MAX_TOTAL = 254;
const MAX_LABEL = 63;
const MIN_TOTAL = 6;

const LOCAL_CHARS = /^[A-Za-z0-9._%+-]+$/;
const LABEL_CHARS = /^[A-Za-z0-9-]+$/;
const ALPHA_ONLY = /^[A-Za-z]+$/;

function isValidEmail(email) {
    if (typeof email !== "string") return false;
    if (email.length < MIN_TOTAL || email.length > MAX_TOTAL) return false;
    if (/\s/.test(email)) return false;

    const at = email.indexOf("@");
    if (at <= 0 || at !== email.lastIndexOf("@")) return false;

    const local = email.slice(0, at);
    const domain = email.slice(at + 1);
    if (!local || !domain) return false;

    if (local.length > MAX_LOCAL) return false;
    if (local.startsWith(".") || local.endsWith(".")) return false;
    if (local.includes("..")) return false;
    if (!LOCAL_CHARS.test(local)) return false;

    if (domain.length > MAX_DOMAIN) return false;
    if (!domain.includes(".")) return false;
    if (domain.startsWith(".") || domain.endsWith(".")) return false;
    if (domain.includes("..")) return false;
    if (domain.startsWith("-") || domain.endsWith("-")) return false;

    const labels = domain.split(".");
    for (const label of labels) {
        if (label.length === 0 || label.length > MAX_LABEL) return false;
        if (label.startsWith("-") || label.endsWith("-")) return false;
        if (!LABEL_CHARS.test(label)) return false;
    }

    const tld = labels[labels.length - 1];
    if (tld.length < 2) return false;
    if (!ALPHA_ONLY.test(tld)) return false;

    return true;
}

export function validateContactPayload(body) {
    if (!body || typeof body !== "object") {
        return { error: { errCode: 1, error: "Missing fields", status: 400 } };
    }

    const { name, email, category, message } = body;

    if (typeof name !== "string" || typeof email !== "string" || typeof category !== "string" || typeof message !== "string") {
        return { error: { errCode: 1, error: "Missing fields", status: 400 } };
    }

    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const messageTrim = message.trim();

    if (!nameTrim || !emailTrim || !messageTrim) {
        return { error: { errCode: 1, error: "Missing fields", status: 400 } };
    }

    if (!Object.prototype.hasOwnProperty.call(ALLOWED_CATEGORIES, category)) {
        return { error: { errCode: 2, error: "Invalid category", status: 400 } };
    }

    if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
        return { error: { errCode: 2, error: "Invalid input", status: 400 } };
    }

    if (!isValidEmail(emailTrim)) {
        return { error: { errCode: 2, error: "Invalid email", status: 400 } };
    }

    if (nameTrim.length < 3) return { error: { errCode: 3, error: "Name too short", status: 400 } };
    if (name.length > 30) return { error: { errCode: 3, error: "Name too long", status: 400 } };
    const letters = (nameTrim.match(/[A-Za-z]/g) || []).length;
    if (letters < 3) return { error: { errCode: 3, error: "Name must contain at least 3 letters", status: 400 } };
    if (email.length > 40) return { error: { errCode: 4, error: "Email too long", status: 400 } };
    if (messageTrim.split(/\s+/).length < 5) return { error: { errCode: 5, error: "Message too short", status: 400 } };
    if (message.length > 500) return { error: { errCode: 5, error: "Message too long", status: 400 } };

    return {
        ok: true,
        fields: {
            nameTrim,
            emailTrim,
            category,
            categoryLabel: ALLOWED_CATEGORIES[category],
            messageTrim,
        },
    };
}

let cachedKeys = null;
let cachedKeyError = null;

function loadKeys() {
    if (cachedKeys) return cachedKeys;
    if (cachedKeyError) return null;
    const b64 = process.env.EMAIL_OTP_PRIVATE_KEY;
    if (!b64) {
        cachedKeyError = new Error("EMAIL_OTP_PRIVATE_KEY is not configured");
        return null;
    }
    try {
        const pem = Buffer.from(b64, "base64").toString("utf8");
        const privateKey = crypto.createPrivateKey(pem);
        if (privateKey.asymmetricKeyType !== "ed25519") {
            throw new Error(`EMAIL_OTP_PRIVATE_KEY must be an Ed25519 key (got ${privateKey.asymmetricKeyType})`);
        }
        const publicKey = crypto.createPublicKey(privateKey);
        cachedKeys = { privateKey, publicKey };
        return cachedKeys;
    } catch (e) {
        cachedKeyError = e;
        console.error("[OTP] Failed to load Ed25519 private key:", e?.message || e);
        return null;
    }
}

export async function signToken(payload) {
    const keys = loadKeys();
    if (!keys) throw new Error("OTP signing keys not configured");
    const now = Math.floor(Date.now() / 1000);
    const iat = typeof payload.iat === "number" ? payload.iat : now;
    const exp = typeof payload.exp === "number" ? payload.exp : now + OTP_TTL_SECONDS;
    const { iat: _i, exp: _e, jti: _j, ...claims } = payload;
    return await new SignJWT(claims)
        .setProtectedHeader({ alg: "EdDSA", typ: "JWT" })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .setIssuer("portfolio")
        .setAudience("portfolio-contact")
        .setJti(crypto.randomUUID())
        .sign(keys.privateKey);
}

// Token state machine: tracks jtis through reserve → finalize lifecycle.
// Atomic acquire prevents two concurrent /confirm requests from both passing
// the "not consumed" check and double-sending. A failed sendMail releases the
// reservation so the user can retry within the original token TTL.
const tokenState = new Map();
const CONSUMED_PRUNE_THRESHOLD = 500;
const RESERVATION_TTL_SECONDS = 30;

function pruneTokens(now) {
    for (const [k, v] of tokenState) {
        if (v.exp <= now) tokenState.delete(k);
    }
}

export function isTokenConsumed(jti) {
    if (!jti) return false;
    const state = tokenState.get(jti);
    if (!state) return false;
    if (state.exp < Math.floor(Date.now() / 1000)) {
        tokenState.delete(jti);
        return false;
    }
    return true;
}

export function tryAcquireToken(jti) {
    if (!jti) return false;
    const now = Math.floor(Date.now() / 1000);
    const existing = tokenState.get(jti);
    if (existing && existing.exp > now) return false;
    tokenState.set(jti, { exp: now + RESERVATION_TTL_SECONDS, state: "reserved" });
    if (tokenState.size > CONSUMED_PRUNE_THRESHOLD) pruneTokens(now);
    return true;
}

export function finalizeToken(jti, expSec) {
    if (!jti || typeof expSec !== "number") return;
    tokenState.set(jti, { exp: expSec, state: "consumed" });
}

export function releaseToken(jti) {
    if (!jti) return;
    tokenState.delete(jti);
}

export function markTokenConsumed(jti, expSec) {
    if (!jti || typeof expSec !== "number") return;
    tokenState.set(jti, { exp: expSec, state: "consumed" });
    if (tokenState.size > CONSUMED_PRUNE_THRESHOLD) {
        pruneTokens(Math.floor(Date.now() / 1000));
    }
}

export async function verifyToken(token) {
    if (!token || typeof token !== "string") return null;
    const keys = loadKeys();
    if (!keys) return null;
    try {
        const { payload } = await jwtVerify(token, keys.publicKey, {
            algorithms: ["EdDSA"],
            issuer: "portfolio",
            audience: "portfolio-contact",
            clockTolerance: 5,
        });
        return payload;
    } catch (e) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("[OTP] Token verification failed:", e?.code || e?.message || e);
        }
        return null;
    }
}

function sha256Hex(input) {
    return crypto.createHash("sha256").update(input).digest("hex");
}

export function payloadHash({ nameTrim, emailTrim, category, messageTrim }) {
    return sha256Hex(JSON.stringify([nameTrim, emailTrim.toLowerCase(), category, messageTrim]));
}

export function codeHash(code, pepper) {
    return sha256Hex(`${code}.${pepper}`);
}

export function timingSafeEqualHex(a, b) {
    if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function generateOtpCode() {
    return String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
}

// Bounded sliding-window rate limiter. Each key holds an array of recent
// hit timestamps; entries older than the longest window are pruned on access.
// The Map itself is capped to LIMITER_MAX_KEYS to prevent unbounded growth
// from per-IP/email/endpoint key proliferation.
const limiterStore = new Map();
const LIMITER_MAX_KEYS = 10_000;
const LIMITER_MAX_WINDOW_MS = 24 * 60 * 60 * 1000;
const LIMITER_PRUNE_EVERY_MS = 5 * 60 * 1000;
let limiterLastPrune = 0;

function pruneLimiter(now) {
    for (const [key, entries] of limiterStore) {
        const recent = entries.filter((t) => now - t < LIMITER_MAX_WINDOW_MS);
        if (recent.length === 0) limiterStore.delete(key);
        else if (recent.length !== entries.length) limiterStore.set(key, recent);
    }
    if (limiterStore.size > LIMITER_MAX_KEYS) {
        const overflow = limiterStore.size - LIMITER_MAX_KEYS;
        const iter = limiterStore.keys();
        for (let i = 0; i < overflow; i++) {
            const next = iter.next();
            if (next.done) break;
            limiterStore.delete(next.value);
        }
    }
}

export function isRateLimited(key, max, windowMs) {
    const now = Date.now();
    if (now - limiterLastPrune > LIMITER_PRUNE_EVERY_MS) {
        pruneLimiter(now);
        limiterLastPrune = now;
    }
    const entries = limiterStore.get(key) || [];
    const recent = entries.filter((t) => now - t < windowMs);
    if (recent.length >= max) {
        limiterStore.set(key, recent);
        return true;
    }
    recent.push(now);
    limiterStore.set(key, recent);
    return false;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(id);
    }
}

// Strips RFC 5322 specials so a Reply-To header can't smuggle extra addresses.
export function sanitizeDisplayName(s) {
    if (typeof s !== "string") return "";
    return s.replace(/[\r\n"<>()@,;:\\\[\]]/g, "").trim().slice(0, 60);
}

export async function verifyRecaptcha(recaptchaToken) {
    if (!recaptchaToken || typeof recaptchaToken !== "string") {
        return { ok: false, reason: "missing-token" };
    }
    if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.warn("[reCAPTCHA] RECAPTCHA_SECRET_KEY is not set");
        return { ok: false, reason: "secret-not-configured" };
    }

    let data;
    try {
        const res = await fetchWithTimeout("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(recaptchaToken)}`,
        }, 5000);
        data = await res.json();
    } catch (e) {
        console.warn("[reCAPTCHA] siteverify request failed:", e?.message || e);
        return { ok: false, reason: "siteverify-network-error" };
    }

    if (!data.success) {
        const codes = Array.isArray(data["error-codes"]) ? data["error-codes"].join(",") : "unknown";
        console.warn(`[reCAPTCHA] siteverify rejected token: ${codes}`);
        return { ok: false, reason: `siteverify:${codes}` };
    }

    const expectedHost = process.env.RECAPTCHA_EXPECTED_HOSTNAME;
    if (expectedHost && data.hostname && data.hostname !== expectedHost) {
        console.warn(`[reCAPTCHA] hostname mismatch: got '${data.hostname}', expected '${expectedHost}'`);
        return { ok: false, reason: `hostname-mismatch:got=${data.hostname},expected=${expectedHost}` };
    }

    if (typeof data.score === "number" && data.score < 0.5) {
        console.warn(`[reCAPTCHA] score below threshold: ${data.score}`);
        return { ok: false, reason: `score:${data.score}` };
    }

    return { ok: true };
}

// Trust model: x-real-ip is set by Vercel's edge and cannot be spoofed by
// clients (Vercel strips inbound). x-forwarded-for is also set by Vercel but
// is comma-separated with the client IP first; we take only the LAST hop
// after Vercel's last proxy, which equals x-real-ip when available. Falling
// back to the first xff value is a last resort for non-Vercel deployments.
export function getClientIp(request) {
    const real = request.headers.get("x-real-ip");
    if (real) return real.trim();
    const fwd = request.headers.get("x-forwarded-for");
    if (fwd) {
        const parts = fwd.split(",").map((s) => s.trim()).filter(Boolean);
        if (parts.length > 0) return parts[parts.length - 1];
    }
    return "unknown";
}

export function getOtpSecrets() {
    const pepper = process.env.EMAIL_OTP_PEPPER;
    const keys = loadKeys();
    if (!pepper || !keys) return null;
    return { pepper };
}

export function createTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.PORTFOLIO_MAIL_ADDR,
            pass: process.env.PORTFOLIO_MAIL_PASS,
        },
    });
}
