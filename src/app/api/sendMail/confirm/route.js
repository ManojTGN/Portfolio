import {
    validateContactPayload,
    verifyToken,
    payloadHash,
    codeHash,
    timingSafeEqualHex,
    isRateLimited,
    getClientIp,
    getOtpSecrets,
    createTransporter,
    sanitizeDisplayName,
    tryAcquireToken,
    finalizeToken,
    releaseToken,
} from "@/app/lib/contact";
import { renderContactEmail, FROM_NAME_CONTACT } from "@/app/lib/email";
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

export async function OPTIONS() { return preflight(ALLOWED); }

export async function POST(request) {
    try {
        if (!isSameOrigin(request)) return forbiddenOrigin();
        const ip = getClientIp(request);
        if (isRateLimited(`confirm:ip:${ip}`, 10, 60 * 1000)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Too many requests, try again later", {
                status: 429,
                headers: rateLimitHeaders({ limit: 10, remaining: 0, resetAfterSec: 60, retryAfterSec: 60 }),
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
        const { nameTrim, emailTrim, category, categoryLabel, messageTrim } = validation.fields;

        const { otpToken, code } = body;
        if (typeof otpToken !== "string" || typeof code !== "string") {
            return jsonError(ERROR_CODES.VALIDATION_FAILED, "Missing verification code", {
                status: 422,
                details: { fields: ["otpToken", "code"] },
            });
        }
        if (!/^\d{6}$/.test(code)) {
            return jsonError(ERROR_CODES.VALIDATION_FAILED, "Invalid code format", {
                status: 422,
                details: { field: "code", pattern: "^\\d{6}$" },
            });
        }

        const secrets = getOtpSecrets();
        if (!secrets) {
            console.error("EMAIL_OTP_PRIVATE_KEY / EMAIL_OTP_PEPPER not configured");
            return jsonError(ERROR_CODES.SERVER_MISCONFIGURED, "Server is misconfigured", { status: 500 });
        }

        const claims = await verifyToken(otpToken);
        if (!claims) {
            // Unified error for invalid/expired/consumed/mismatched — avoids
            // leaking which specific state a probed token is in.
            return jsonError(ERROR_CODES.UNAUTHORIZED, "Invalid or expired code", { status: 401 });
        }

        const tokenKey = otpToken.slice(-32);
        if (isRateLimited(`confirm:token:${tokenKey}`, 5, 10 * 60 * 1000)) {
            return jsonError(ERROR_CODES.RATE_LIMITED, "Too many attempts. Please resend the code.", {
                status: 429,
                headers: rateLimitHeaders({ limit: 5, remaining: 0, resetAfterSec: 600, retryAfterSec: 600 }),
            });
        }

        if (claims.e !== emailTrim || claims.c !== category) {
            return jsonError(ERROR_CODES.UNAUTHORIZED, "Invalid or expired code", { status: 401 });
        }

        const ph = payloadHash({ nameTrim, emailTrim, category, messageTrim });
        if (!timingSafeEqualHex(ph, claims.ph)) {
            return jsonError(ERROR_CODES.UNAUTHORIZED, "Invalid or expired code", { status: 401 });
        }

        const submittedHash = codeHash(code, secrets.pepper);
        if (!timingSafeEqualHex(submittedHash, claims.ch)) {
            return jsonError(ERROR_CODES.UNAUTHORIZED, "Invalid or expired code", { status: 401 });
        }

        // Atomically reserve the jti before sending mail. A concurrent /confirm
        // with the same token cannot pass this check, so the email is sent at
        // most once even under perfectly racing requests.
        if (!tryAcquireToken(claims.jti)) {
            return jsonError(ERROR_CODES.UNAUTHORIZED, "Invalid or expired code", { status: 401 });
        }

        try {
            const { subject, text, html } = renderContactEmail({
                name: nameTrim,
                email: emailTrim,
                categoryLabel,
                message: messageTrim,
            });
            const safeReplyName = sanitizeDisplayName(nameTrim);
            const replyTo = safeReplyName ? `"${safeReplyName}" <${emailTrim}>` : emailTrim;

            const ownerMailbox = process.env.PORTFOLIO_MAIL_TO || process.env.PORTFOLIO_MAIL_ADDR;
            const ccSender = emailTrim.toLowerCase() !== String(ownerMailbox).toLowerCase() ? emailTrim : undefined;

            const transporter = createTransporter();
            await transporter.sendMail({
                from: `"${FROM_NAME_CONTACT}" <${process.env.PORTFOLIO_MAIL_ADDR}>`,
                replyTo,
                to: ownerMailbox,
                cc: ccSender,
                subject,
                text,
                html,
                headers: {
                    "X-Entity-Ref-ID": `contact-${Math.floor(Date.now() / 1000)}`,
                },
            });
        } catch (err) {
            // Release the reservation so the user can retry with the same code.
            releaseToken(claims.jti);
            throw err;
        }

        finalizeToken(claims.jti, claims.exp);

        return jsonOk({ message: "Email sent successfully!" }, { status: 201 });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.debug("[sendMail/confirm] error", err);
        return jsonError(ERROR_CODES.SERVER_ERROR, "Failed to send email", { status: 500 });
    }
}

export async function GET() { return methodNotAllowed(ALLOWED); }
export async function PUT() { return methodNotAllowed(ALLOWED); }
export async function PATCH() { return methodNotAllowed(ALLOWED); }
export async function DELETE() { return methodNotAllowed(ALLOWED); }
export async function HEAD() { return methodNotAllowed(ALLOWED); }
