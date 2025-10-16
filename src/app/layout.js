import Script from "next/script";

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
        <html lang="en" className="dark">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Script src="https://kit.fontawesome.com/08c3f952c9.js" crossorigin="anonymous" />
            </head>
            <body className="m-0 p-0 dark:bg-stone-950 bg-white aspect-video"> 
                {children}
            </body>    
        </html>
    );
}
