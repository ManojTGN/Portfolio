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

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const IP_PER_MIN = 2;
const IP_PER_HOUR = 5;
const IP_PER_DAY = 10;

const EMAIL_PER_MIN = 1;
const EMAIL_PER_HOUR = 2;
const EMAIL_PER_DAY = 2;

function rateLimit429(error, retryAfterSeconds) {
    const headers = retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined;
    return Response.json({ errCode: 8, error, success: false, retryAfter: retryAfterSeconds }, { status: 429, headers });
}

export async function POST(request) {
    try {
        const ip = getClientIp(request);
        if (isRateLimited(`start:ip:1m:${ip}`, IP_PER_MIN, MIN)) return rateLimit429("Too many requests, try again in a minute", 60);
        if (isRateLimited(`start:ip:1h:${ip}`, IP_PER_HOUR, HOUR)) return rateLimit429("Hourly request limit reached", 3600);
        if (isRateLimited(`start:ip:1d:${ip}`, IP_PER_DAY, DAY)) return rateLimit429("Daily request limit reached", 86400);

        let body;
        try {
            body = await request.json();
        } catch {
            return Response.json({ errCode: 1, error: "Missing fields", success: false }, { status: 400 });
        }

        const validation = validateContactPayload(body);
        if (validation.error) {
            const { errCode, error, status } = validation.error;
            return Response.json({ errCode, error, success: false }, { status });
        }
        const { nameTrim, emailTrim, category, messageTrim } = validation.fields;

        const emailKey = emailTrim.toLowerCase();
        if (isRateLimited(`start:email:1m:${emailKey}`, EMAIL_PER_MIN, MIN)) {
            return rateLimit429("A code was just sent to this email. Please wait a minute before requesting another.", 60);
        }
        if (isRateLimited(`start:email:1h:${emailKey}`, EMAIL_PER_HOUR, HOUR)) {
            return rateLimit429("Too many codes sent to this email recently. Try again in an hour.", 3600);
        }
        if (isRateLimited(`start:email:1d:${emailKey}`, EMAIL_PER_DAY, DAY)) {
            return rateLimit429("Daily verification limit reached for this email.", 86400);
        }

        const { token: recaptchaToken } = body;
        if (typeof recaptchaToken !== "string" || !recaptchaToken) {
            return Response.json({ errCode: 6, error: "Missing reCaptcha token", success: false }, { status: 400 });
        }

        const recaptcha = await verifyRecaptcha(recaptchaToken);
        if (!recaptcha.ok) {
            const payload = { errCode: 6, error: "Invalid reCaptcha", success: false };
            if (process.env.NODE_ENV !== "production" && recaptcha.reason) {
                payload.reason = recaptcha.reason;
            }
            return Response.json(payload, { status: 400 });
        }

        const secrets = getOtpSecrets();
        if (!secrets) {
            console.error("EMAIL_OTP_PRIVATE_KEY / EMAIL_OTP_PEPPER not configured");
            return Response.json({ errCode: 7, error: "Server misconfigured", success: false }, { status: 500 });
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

        return Response.json({
            success: true,
            otpToken,
            expiresIn: OTP_TTL_SECONDS,
        }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ errCode: 7, error: "Failed to send verification code", success: false }, { status: 500 });
    }
}
