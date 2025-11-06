import Script from "next/script";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import "./i18n.js";

export const metadata = {
    title: "ManojTGN ▪ Portfolio",
    description: "Portfolio",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Script src="https://kit.fontawesome.com/08c3f952c9.js" crossorigin="anonymous" />
                <Script src="https://www.google.com/recaptcha/enterprise.js?onload=reCaptchaOnloadCallback&render=explicit" strategy="lazyOnload" />
            </head>
            <body className="m-0 p-0 w-full h-screen dark:bg-portfolio-950 bg-portfolio-50">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </body>    
        </html>
    );
}
