import crypto from "crypto";
import nodemailer from "nodemailer";

export const ALLOWED_CATEGORIES = {
    project: "Project Inquiry",
    job: "Job Opportunity",
    collab: "Collaboration",
    feedback: "Feedback",
    other: "Other",
};

export const OTP_TTL_SECONDS = 600;
export const RESEND_COOLDOWN_SECONDS = 60;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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

    if (!EMAIL_REGEX.test(emailTrim)) {
        return { error: { errCode: 2, error: "Invalid email", status: 400 } };
    }

    if (nameTrim.length < 3) return { error: { errCode: 3, error: "Name too short", status: 400 } };
    if (name.length > 30) return { error: { errCode: 3, error: "Name too long", status: 400 } };
    if (email.length > 40) return { error: { errCode: 4, error: "Email too long", status: 400 } };
    if (messageTrim.split(/\s+/).length < 3) return { error: { errCode: 5, error: "Message too short", status: 400 } };
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

// HMAC-SHA256 over base64url(JSON payload). Stateless OTP envelope.
export function signToken(payload, secret) {
    if (!secret) throw new Error("OTP_SECRET is not configured");
    const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const sig = crypto.createHmac("sha256", secret).update(body).digest("base64url");
    return `${body}.${sig}`;
}

export function verifyToken(token, secret) {
    if (!secret || typeof token !== "string" || !token.includes(".")) return null;
    const dot = token.indexOf(".");
    const body = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (!body || !sig) return null;

    const expected = crypto.createHmac("sha256", secret).update(body).digest("base64url");
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;

    let claims;
    try {
        claims = JSON.parse(Buffer.from(body, "base64url").toString());
    } catch {
        return null;
    }

    if (typeof claims.exp !== "number" || claims.exp < Math.floor(Date.now() / 1000)) return null;
    return claims;
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

// In-memory sliding-window rate limiter. Per-instance; serverless cold starts reset it.
// Acceptable for a portfolio — combined with reCAPTCHA + email-rate-limit + OTP secret it stays safe.
const limiterStore = new Map();

export function isRateLimited(key, max, windowMs) {
    const now = Date.now();
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

// Returns a string safe to embed inside a `"display name" <addr>` header value.
// Strips characters that are special in RFC 5322 address parsing (which could
// otherwise be used to smuggle additional addresses into a Reply-To header).
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

export function getClientIp(request) {
    const fwd = request.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim();
    return request.headers.get("x-real-ip") || "unknown";
}

export function getOtpSecrets() {
    const secret = process.env.OTP_SECRET;
    const pepper = process.env.OTP_PEPPER;
    if (!secret || !pepper) return null;
    return { secret, pepper };
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
