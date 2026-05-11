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
} from "@/app/lib/contact";
import { renderContactEmail, FROM_NAME_CONTACT } from "@/app/lib/email";

export async function POST(request) {
    try {
        const ip = getClientIp(request);
        if (isRateLimited(`confirm:ip:${ip}`, 10, 60 * 1000)) {
            return Response.json({ errCode: 8, error: "Too many requests, try again later", success: false }, { status: 429 });
        }

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
        const { nameTrim, emailTrim, category, categoryLabel, messageTrim } = validation.fields;

        const { otpToken, code } = body;
        if (typeof otpToken !== "string" || typeof code !== "string") {
            return Response.json({ errCode: 9, error: "Missing verification code", success: false }, { status: 400 });
        }

        if (!/^\d{6}$/.test(code)) {
            return Response.json({ errCode: 9, error: "Invalid code format", success: false }, { status: 400 });
        }

        const secrets = getOtpSecrets();
        if (!secrets) {
            console.error("OTP_SECRET / OTP_PEPPER not configured");
            return Response.json({ errCode: 7, error: "Server misconfigured", success: false }, { status: 500 });
        }

        const claims = verifyToken(otpToken, secrets.secret);
        if (!claims) {
            return Response.json({ errCode: 9, error: "Invalid or expired code", success: false }, { status: 400 });
        }

        // Per-token attempt counter (best-effort; in-memory so resets on cold start, fine alongside 1-in-1M guess + rate limit).
        // Key by the otpToken signature suffix so different tokens have different buckets.
        const tokenKey = otpToken.slice(-32);
        if (isRateLimited(`confirm:token:${tokenKey}`, 5, 10 * 60 * 1000)) {
            return Response.json({ errCode: 9, error: "Too many attempts. Please resend the code.", success: false }, { status: 429 });
        }

        // Email + category must match the token issuance
        if (claims.e !== emailTrim || claims.c !== category) {
            return Response.json({ errCode: 9, error: "Verification mismatch", success: false }, { status: 400 });
        }

        // Payload must be identical to what was locked into the token at /start time
        const ph = payloadHash({ nameTrim, emailTrim, category, messageTrim });
        if (!timingSafeEqualHex(ph, claims.ph)) {
            return Response.json({ errCode: 9, error: "Verification mismatch", success: false }, { status: 400 });
        }

        // Constant-time code check
        const submittedHash = codeHash(code, secrets.pepper);
        if (!timingSafeEqualHex(submittedHash, claims.ch)) {
            return Response.json({ errCode: 9, error: "Invalid or expired code", success: false }, { status: 400 });
        }

        // All checks passed — send the real contact email to the owner
        const { subject, text, html } = renderContactEmail({
            name: nameTrim,
            email: emailTrim,
            categoryLabel,
            message: messageTrim,
        });
        const safeReplyName = sanitizeDisplayName(nameTrim);
        const replyTo = safeReplyName
            ? `"${safeReplyName}" <${emailTrim}>`
            : emailTrim;

        // Owner mailbox (where the contact form delivers). Falls back to the SMTP
        // sender address for backward compatibility if PORTFOLIO_MAIL_TO isn't set.
        const ownerMailbox = process.env.PORTFOLIO_MAIL_TO || process.env.PORTFOLIO_MAIL_ADDR;
        // CC the verified sender so they get a copy of their own submission.
        // Skip the CC if the sender's address is the owner mailbox (avoids duplicates).
        const ccSender = emailTrim.toLowerCase() !== String(ownerMailbox).toLowerCase()
            ? emailTrim
            : undefined;

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

        return Response.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ errCode: 7, error: "Failed to send email", success: false }, { status: 500 });
    }
}
