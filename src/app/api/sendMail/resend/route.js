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
} from "@/app/lib/contact";
import { renderOtpEmail, FROM_NAME_OTP } from "@/app/lib/email";

// Resend re-uses the payload locked in the existing otpToken (so no captcha needed),
// but generates a fresh code and a fresh token.
export async function POST(request) {
    try {
        const ip = getClientIp(request);
        if (isRateLimited(`resend:ip:${ip}`, 5, 60 * 1000)) {
            return Response.json({ errCode: 8, error: "Too many requests, try again later", success: false }, { status: 429 });
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
            console.error("OTP_SECRET / OTP_PEPPER not configured");
            return Response.json({ errCode: 7, error: "Server misconfigured", success: false }, { status: 500 });
        }

        const claims = verifyToken(incomingToken, secrets.secret);
        if (!claims) {
            return Response.json({ errCode: 9, error: "Invalid or expired session", success: false }, { status: 400 });
        }

        // Cooldown: don't issue a new code more often than RESEND_COOLDOWN_SECONDS
        const nowSec = Math.floor(Date.now() / 1000);
        if (typeof claims.iat === "number" && nowSec - claims.iat < RESEND_COOLDOWN_SECONDS) {
            const retryAfter = RESEND_COOLDOWN_SECONDS - (nowSec - claims.iat);
            return Response.json({ errCode: 8, error: `Please wait ${retryAfter}s before resending`, success: false, retryAfter }, { status: 429 });
        }

        // Per-email cap (1 hour, total across start + resend together via shared prefix would be ideal, but
        // resends already require a valid token so blanket-spam from start is the harder vector). Keep a separate
        // resend cap to be safe.
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
        const otpToken = signToken(newClaims, secrets.secret);

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
