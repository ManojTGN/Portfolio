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
    isTokenConsumed,
    markTokenConsumed,
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
            console.error("EMAIL_OTP_PRIVATE_KEY / EMAIL_OTP_PEPPER not configured");
            return Response.json({ errCode: 7, error: "Server misconfigured", success: false }, { status: 500 });
        }

        const claims = await verifyToken(otpToken);
        if (!claims) {
            return Response.json({ errCode: 9, error: "Invalid or expired code", success: false }, { status: 400 });
        }

        if (isTokenConsumed(claims.jti)) {
            return Response.json({ errCode: 9, error: "This verification code has already been used", success: false }, { status: 400 });
        }

        const tokenKey = otpToken.slice(-32);
        if (isRateLimited(`confirm:token:${tokenKey}`, 5, 10 * 60 * 1000)) {
            return Response.json({ errCode: 9, error: "Too many attempts. Please resend the code.", success: false }, { status: 429 });
        }

        if (claims.e !== emailTrim || claims.c !== category) {
            return Response.json({ errCode: 9, error: "Verification mismatch", success: false }, { status: 400 });
        }

        const ph = payloadHash({ nameTrim, emailTrim, category, messageTrim });
        if (!timingSafeEqualHex(ph, claims.ph)) {
            return Response.json({ errCode: 9, error: "Verification mismatch", success: false }, { status: 400 });
        }

        const submittedHash = codeHash(code, secrets.pepper);
        if (!timingSafeEqualHex(submittedHash, claims.ch)) {
            return Response.json({ errCode: 9, error: "Invalid or expired code", success: false }, { status: 400 });
        }

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

        const ownerMailbox = process.env.PORTFOLIO_MAIL_TO || process.env.PORTFOLIO_MAIL_ADDR;
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

        markTokenConsumed(claims.jti, claims.exp);

        return Response.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ errCode: 7, error: "Failed to send email", success: false }, { status: 500 });
    }
}
