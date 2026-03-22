import nodemailer from "nodemailer";

const MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW = 60 * 1000;
const requestLog = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const entries = requestLog.get(ip) || [];
    const recent = entries.filter(t => now - t < RATE_LIMIT_WINDOW);
    requestLog.set(ip, recent);
    if (recent.length >= MAX_REQUESTS) return true;
    recent.push(now);
    return false;
}

export async function POST(request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        if (isRateLimited(ip)) {
            return Response.json({ errCode: 8, error: "Too many requests, try again later", success: false, message: null }, { status: 429 });
        }

        const body = await request.json();
        const { name, email, message, token } = body;

        if (!name || !email || !message) {
            return Response.json({ errCode: 1, error: "Missing fields", success: false, message: null }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json({ errCode: 2, error: "Invalid email", success: false, message: null }, { status: 400 });
        }

        if (name.length > 30) {
            return Response.json({ errCode: 3, error: "Name too long", success: false, message: null }, { status: 400 });
        }

        if (email.length > 40) {
            return Response.json({ errCode: 4, error: "Email too long", success: false, message: null }, { status: 400 });
        }

        if (message.length > 500) {
            return Response.json({ errCode: 5, error: "Message too long", success: false, message: null }, { status: 400 });
        }

        if (!token) {
            return Response.json({ errCode: 6, error: "Missing reCaptcha token", success: false, message: null }, { status: 400 });
        }

        const res = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(token)}`
            }
        );
        const data = await res.json();

        if (!data.success) {
            return Response.json({ errCode: 6, error: "Invalid reCaptcha", success: false, message: null }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.PORTFOLIO_MAIL_ADDR,
                pass: process.env.PORTFOLIO_MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.PORTFOLIO_MAIL_ADDR,
            replyTo: email,
            to: process.env.PORTFOLIO_MAIL_ADDR,
            subject: `Portfolio Contact: ${name.replace(/[\r\n]/g, '')}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        return Response.json({ errCode: null, error: null, success: true, message: "Email sent successfully!" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ errCode: 7, error: "Failed to send email", success: false, message: null }, { status: 500 });
    }
}
