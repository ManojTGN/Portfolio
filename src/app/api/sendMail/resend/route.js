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
    isTokenConsumed,
    markTokenConsumed,
} from "@/app/lib/contact";
import { renderOtpEmail, FROM_NAME_OTP } from "@/app/lib/email";

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const IP_PER_MIN = 2;
const IP_PER_HOUR = 5;
const IP_PER_DAY = 10;

export async function POST(request) {
    try {
        const ip = getClientIp(request);
        if (isRateLimited(`resend:ip:1m:${ip}`, IP_PER_MIN, MIN)) {
            return Response.json({ errCode: 8, error: "Too many requests, try again later", success: false, retryAfter: 60 }, { status: 429, headers: { "Retry-After": "60" } });
        }
        if (isRateLimited(`resend:ip:1h:${ip}`, IP_PER_HOUR, HOUR)) {
            return Response.json({ errCode: 8, error: "Hourly resend limit reached", success: false, retryAfter: 3600 }, { status: 429, headers: { "Retry-After": "3600" } });
        }
        if (isRateLimited(`resend:ip:1d:${ip}`, IP_PER_DAY, DAY)) {
            return Response.json({ errCode: 8, error: "Daily resend limit reached", success: false, retryAfter: 86400 }, { status: 429, headers: { "Retry-After": "86400" } });
        }

        let body;
        try {
            body = await request.json();
        } catch {
            return Response.json({ errCode: 1, error: "Missing fields", success: false }, { status: 400 });
        }

        const { otpToken: incomingToken, lang: requestedLang } = body || {};
        if (typeof incomingToken !== "string" || !incomingToken) {
            return Response.json({ errCode: 9, error: "Missing verification token", success: false }, { status: 400 });
        }

        const secrets = getOtpSecrets();
        if (!secrets) {
            console.error("EMAIL_OTP_PRIVATE_KEY / EMAIL_OTP_PEPPER not configured");
            return Response.json({ errCode: 7, error: "Server misconfigured", success: false }, { status: 500 });
        }

        const claims = await verifyToken(incomingToken);
        if (!claims) {
            return Response.json({ errCode: 9, error: "Invalid or expired session", success: false }, { status: 400 });
        }

        if (isTokenConsumed(claims.jti)) {
            return Response.json({ errCode: 9, error: "This verification session has already been completed", success: false }, { status: 400 });
        }

        const nowSec = Math.floor(Date.now() / 1000);
        if (typeof claims.iat === "number" && nowSec - claims.iat < RESEND_COOLDOWN_SECONDS) {
            const retryAfter = RESEND_COOLDOWN_SECONDS - (nowSec - claims.iat);
            return Response.json({ errCode: 8, error: `Please wait ${retryAfter}s before resending`, success: false, retryAfter }, { status: 429 });
        }

        if (isRateLimited(`resend:email:${String(claims.e).toLowerCase()}`, 5, 60 * 60 * 1000)) {
            return Response.json({ errCode: 8, error: "Too many resends for this email", success: false }, { status: 429 });
        }

        const code = generateOtpCode();
        const newClaims = {
            e: claims.e,
            c: claims.c,
            ph: claims.ph,
            ch: codeHash(code, secrets.pepper),
            iat: nowSec,
            exp: nowSec + OTP_TTL_SECONDS,
        };
        const otpToken = await signToken(newClaims);

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

        markTokenConsumed(claims.jti, claims.exp);

        return Response.json({
            success: true,
            otpToken,
            expiresIn: OTP_TTL_SECONDS,
        }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ errCode: 7, error: "Failed to resend verification code", success: false }, { status: 500 });
    }
}
