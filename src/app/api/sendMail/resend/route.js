import {
    verifyToken,
    signToken,
    codeHash,
    generateOtpCode,
    isRateLimited,
    getClientIp,
    getOtpSecrets,
    createTransporter,
    OTP_TTL_SECONDS,
    RESEND_COOLDOWN_SECONDS,
    tryAcquireToken,
    finalizeToken,
    releaseToken,
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
const MAX_BODY_BYTES = 4 * 1024;

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const IP_PER_MIN = 2;
const IP_PER_HOUR = 5;
const IP_PER_DAY = 10;

export async function OPTIONS() { return preflight(ALLOWED); }

export async function POST(request) {
    try {
        if (!isSameOrigin(request)) return forbiddenOrigin();
        const ip = getClientIp(request);
        if (isRateLimited(`resend:ip:1m:${ip}`, IP_PER_MIN, MIN)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Too many requests, try again later", {
                status: 429,
                headers: rateLimitHeaders({ limit: IP_PER_MIN, remaining: 0, resetAfterSec: 60, retryAfterSec: 60 }),
            });
        }
        if (isRateLimited(`resend:ip:1h:${ip}`, IP_PER_HOUR, HOUR)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Hourly resend limit reached", {
                status: 429,
                headers: rateLimitHeaders({ limit: IP_PER_HOUR, remaining: 0, resetAfterSec: 3600, retryAfterSec: 3600 }),
            });
        }
        if (isRateLimited(`resend:ip:1d:${ip}`, IP_PER_DAY, DAY)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Daily resend limit reached", {
                status: 429,
                headers: rateLimitHeaders({ limit: IP_PER_DAY, remaining: 0, resetAfterSec: 86400, retryAfterSec: 86400 }),
            });
        }

        const parsed = await requireJsonBody(request, { maxBytes: MAX_BODY_BYTES });
        if (parsed.error) return parsed.error;
        const { otpToken: incomingToken, lang: requestedLang } = parsed.body || {};

        if (typeof incomingToken !== "string" || !incomingToken) {
            return jsonError(ERROR_CODES.VALIDATION_FAILED, "Missing verification token", {
                status: 422,
                details: { field: "otpToken" },
            });
        }

        const secrets = getOtpSecrets();
        if (!secrets) {
            console.error("EMAIL_OTP_PRIVATE_KEY / EMAIL_OTP_PEPPER not configured");
            return jsonError(ERROR_CODES.SERVER_MISCONFIGURED, "Server is misconfigured", { status: 500 });
        }

        const claims = await verifyToken(incomingToken);
        if (!claims) {
            return jsonError(ERROR_CODES.UNAUTHORIZED, "Invalid or expired session", { status: 401 });
        }

        const nowSec = Math.floor(Date.now() / 1000);
        if (typeof claims.iat === "number" && nowSec - claims.iat < RESEND_COOLDOWN_SECONDS) {
            const retryAfter = RESEND_COOLDOWN_SECONDS - (nowSec - claims.iat);
            return jsonError(ERROR_CODES.RATE_LIMITED, `Please wait ${retryAfter}s before resending`, {
                status: 429,
                headers: rateLimitHeaders({ limit: 1, remaining: 0, resetAfterSec: retryAfter, retryAfterSec: retryAfter }),
            });
        }

        if (isRateLimited(`resend:email:${String(claims.e).toLowerCase()}`, 5, HOUR)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Too many resends for this email", {
                status: 429,
                headers: rateLimitHeaders({ limit: 5, remaining: 0, resetAfterSec: 3600, retryAfterSec: 3600 }),
            });
        }

        // Atomically reserve the old jti so a second concurrent /resend can't
        // also issue a replacement token for the same session.
        if (!tryAcquireToken(claims.jti)) {
            return jsonError(ERROR_CODES.UNAUTHORIZED, "Invalid or expired session", { status: 401 });
        }

        let otpToken;
        try {
            const code = generateOtpCode();
            const newClaims = {
                e: claims.e,
                c: claims.c,
                ph: claims.ph,
                ch: codeHash(code, secrets.pepper),
                iat: nowSec,
                exp: nowSec + OTP_TTL_SECONDS,
            };
            otpToken = await signToken(newClaims);

            const { subject, text, html } = renderOtpEmail({
                code,
                ttlMinutes: Math.floor(OTP_TTL_SECONDS / 60),
                lang: requestedLang,
            });
            const transporter = createTransporter();
            await transporter.sendMail({
                from: `"${FROM_NAME_OTP}" <${process.env.PORTFOLIO_MAIL_ADDR}>`,
                to: claims.e,
                replyTo: process.env.PORTFOLIO_MAIL_ADDR,
                subject,
                text,
                html,
                headers: {
                    "Auto-Submitted": "auto-generated",
                    "X-Auto-Response-Suppress": "All",
                    "X-Entity-Ref-ID": `otp-${nowSec}-r`,
                },
            });
        } catch (err) {
            // Release the reservation so the user can retry within the original TTL.
            releaseToken(claims.jti);
            throw err;
        }

        finalizeToken(claims.jti, claims.exp);

        return jsonOk(
            { otpToken, expiresIn: OTP_TTL_SECONDS },
            { status: 201, headers: { Location: "/api/sendMail/confirm" } }
        );
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.debug("[sendMail/resend] error", err);
        return jsonError(ERROR_CODES.SERVER_ERROR, "Failed to resend verification code", { status: 500 });
    }
}

export async function GET() { return methodNotAllowed(ALLOWED); }
export async function PUT() { return methodNotAllowed(ALLOWED); }
export async function PATCH() { return methodNotAllowed(ALLOWED); }
export async function DELETE() { return methodNotAllowed(ALLOWED); }
export async function HEAD() { return methodNotAllowed(ALLOWED); }
