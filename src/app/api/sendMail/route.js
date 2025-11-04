import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message, token } = body;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ errCode:1, error: "Missing fields", success:false, message:null }), { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ errCode:2, error: "Invalid email", success:false, message:null }), { status: 400 });
        }

        if (name.length > 30) {
            return new Response(JSON.stringify({ errCode:3, error: "Name too long", success:false, message:null }), { status: 400 });
        }

        if (email.length > 40) {
            return new Response(JSON.stringify({ errCode:4, error: "Email too long", success:false, message:null }), { status: 400 });
        }

        if (message.length > 500) {
            return new Response(JSON.stringify({ errCode:5, error: "Message too long", success:false, message:null }), { status: 400 });
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
            return new Response(JSON.stringify({ errCode:6, error: "Invalid reCaptcha", success:false, message:null }), { status: 400 });
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

        return new Response(JSON.stringify({ errCode:null, error:null, success:true, message: "Email sent successfully!" }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ errCode:7, error: "Failed to send email", success:false, message:null }), { status: 500 });
    }
}