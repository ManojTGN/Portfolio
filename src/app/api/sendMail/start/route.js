import {
    validateContactPayload,
    verifyRecaptcha,
    signToken,
    payloadHash,
    codeHash,
    generateOtpCode,
    isRateLimited,
    getClientIp,
    getOtpSecrets,
    createTransporter,
    OTP_TTL_SECONDS,
} from "@/app/lib/contact";
import { renderOtpEmail, FROM_NAME_OTP } from "@/app/lib/email";
import {
    jsonOk,
    jsonError,
    methodNotAllowed,
    preflight,
    requireJsonBody,
    rateLimitHeaders,
    isSameOrigin,
    forbiddenOrigin,
    ERROR_CODES,
} from "@/app/lib/api";

const ALLOWED = ["POST", "OPTIONS"];
const MAX_BODY_BYTES = 8 * 1024;

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const IP_PER_MIN = 2;
const IP_PER_HOUR = 5;
const IP_PER_DAY = 10;

const EMAIL_PER_MIN = 1;
const EMAIL_PER_HOUR = 2;
const EMAIL_PER_DAY = 2;

export async function OPTIONS() { return preflight(ALLOWED); }

export async function POST(request) {
    try {
        if (!isSameOrigin(request)) return forbiddenOrigin();
        const ip = getClientIp(request);
        if (isRateLimited(`start:ip:1m:${ip}`, IP_PER_MIN, MIN)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Too many requests, try again in a minute", {
                status: 429,
                headers: rateLimitHeaders({ limit: IP_PER_MIN, remaining: 0, resetAfterSec: 60, retryAfterSec: 60 }),
            });
        }
        if (isRateLimited(`start:ip:1h:${ip}`, IP_PER_HOUR, HOUR)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Hourly request limit reached", {
                status: 429,
                headers: rateLimitHeaders({ limit: IP_PER_HOUR, remaining: 0, resetAfterSec: 3600, retryAfterSec: 3600 }),
            });
        }
        if (isRateLimited(`start:ip:1d:${ip}`, IP_PER_DAY, DAY)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Daily request limit reached", {
                status: 429,
                headers: rateLimitHeaders({ limit: IP_PER_DAY, remaining: 0, resetAfterSec: 86400, retryAfterSec: 86400 }),
            });
        }

        const parsed = await requireJsonBody(request, { maxBytes: MAX_BODY_BYTES });
        if (parsed.error) return parsed.error;
        const body = parsed.body;

        const validation = validateContactPayload(body);
        if (validation.error) {
            return jsonError(ERROR_CODES.VALIDATION_FAILED, validation.error.error, {
                status: validation.error.status === 400 ? 422 : validation.error.status,
                details: { errCode: validation.error.errCode },
            });
        }
        const { nameTrim, emailTrim, category, messageTrim } = validation.fields;

        const emailKey = emailTrim.toLowerCase();
        if (isRateLimited(`start:email:1m:${emailKey}`, EMAIL_PER_MIN, MIN)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "A code was just sent to this email. Please wait a minute before requesting another.", {
                status: 429,
                headers: rateLimitHeaders({ limit: EMAIL_PER_MIN, remaining: 0, resetAfterSec: 60, retryAfterSec: 60 }),
            });
        }
        if (isRateLimited(`start:email:1h:${emailKey}`, EMAIL_PER_HOUR, HOUR)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Too many codes sent to this email recently. Try again in an hour.", {
                status: 429,
                headers: rateLimitHeaders({ limit: EMAIL_PER_HOUR, remaining: 0, resetAfterSec: 3600, retryAfterSec: 3600 }),
            });
        }
        if (isRateLimited(`start:email:1d:${emailKey}`, EMAIL_PER_DAY, DAY)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Daily verification limit reached for this email.", {
                status: 429,
                headers: rateLimitHeaders({ limit: EMAIL_PER_DAY, remaining: 0, resetAfterSec: 86400, retryAfterSec: 86400 }),
            });
        }

        const { token: recaptchaToken } = body;
        if (typeof recaptchaToken !== "string" || !recaptchaToken) {
            return jsonError(ERROR_CODES.VALIDATION_FAILED, "Missing reCaptcha token", {
                status: 422,
                details: { field: "token" },
            });
        }

        const recaptcha = await verifyRecaptcha(recaptchaToken);
        if (!recaptcha.ok) {
            const details = process.env.NODE_ENV !== "production" && recaptcha.reason ? { reason: recaptcha.reason } : undefined;
            return jsonError(ERROR_CODES.UNAUTHORIZED, "reCaptcha verification failed", {
                status: 401,
                details,
            });
        }

        const secrets = getOtpSecrets();
        if (!secrets) {
            console.error("EMAIL_OTP_PRIVATE_KEY / EMAIL_OTP_PEPPER not configured");
            return jsonError(ERROR_CODES.SERVER_MISCONFIGURED, "Server is misconfigured", { status: 500 });
        }

        const code = generateOtpCode();
        const now = Math.floor(Date.now() / 1000);
        const claims = {
            e: emailTrim,
            c: category,
            ph: payloadHash({ nameTrim, emailTrim, category, messageTrim }),
            ch: codeHash(code, secrets.pepper),
            iat: now,
            exp: now + OTP_TTL_SECONDS,
        };
        const otpToken = await signToken(claims);

        const { subject, text, html } = renderOtpEmail({
            code,
            ttlMinutes: Math.floor(OTP_TTL_SECONDS / 60),
            lang: body.lang,
        });
        const transporter = createTransporter();
        await transporter.sendMail({
            from: `"${FROM_NAME_OTP}" <${process.env.PORTFOLIO_MAIL_ADDR}>`,
            to: emailTrim,
            replyTo: process.env.PORTFOLIO_MAIL_ADDR,
            subject,
            text,
            html,
            headers: {
                "Auto-Submitted": "auto-generated",
                "X-Auto-Response-Suppress": "All",
                "X-Entity-Ref-ID": `otp-${claims.iat}-${emailTrim.length}`,
            },
        });

        return jsonOk(
            { otpToken, expiresIn: OTP_TTL_SECONDS },
            { status: 201, headers: { Location: "/api/sendMail/confirm" } }
        );
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.debug("[sendMail/start] error", err);
        return jsonError(ERROR_CODES.SERVER_ERROR, "Failed to send verification code", { status: 500 });
    }
}

export async function GET() { return methodNotAllowed(ALLOWED); }
export async function PUT() { return methodNotAllowed(ALLOWED); }
export async function PATCH() { return methodNotAllowed(ALLOWED); }
export async function DELETE() { return methodNotAllowed(ALLOWED); }
export async function HEAD() { return methodNotAllowed(ALLOWED); }
