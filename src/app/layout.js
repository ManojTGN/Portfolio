import Script from "next/script";

import "./globals.css";
import "./i18n.js";

export const metadata = {
  title: "ManojTGN ▪ Portfolio",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/08c3f952c9.js" crossorigin="anonymous" />
            <body className="m-0 p-0 bg-black h-screen"> {children} </body>
        </html>
    );
}
