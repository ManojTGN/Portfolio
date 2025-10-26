import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message, token } = body;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
        }

        if (name.length > 30) {
            return new Response(JSON.stringify({ error: "Name too long" }), { status: 400 });
        }

        if (email.length > 40) {
            return new Response(JSON.stringify({ error: "Email too long" }), { status: 400 });
        }

        if (message.length > 500) {
            return new Response(JSON.stringify({ error: "Message too long" }), { status: 400 });
        }

        const res = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
            }
        )
        const data = await res.json();
        
        if(!data.success){
            return new Response(JSON.stringify({ error: "Invalid reCaptcha" }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.PORTFOLIO_MAIL_ADDR,
            pass: process.env.PORTFOLIO_MAIL_PASS,
        },
        });

        await transporter.sendMail({
            from: email,
            to: process.env.PORTFOLIO_MAIL_ADDR,
            subject: `Portfolio: ${name}`,
            text: `from:${email}\nmessage:${message}`,
        });

        return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
            status: 200,
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to send email" }), {
            status: 500,
        });
    }
}