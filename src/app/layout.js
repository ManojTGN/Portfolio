import "./globals.css";
import { Inter } from 'next/font/google';
import Script from "next/script";

export const metadata = {
  title: "ManojTGN ▪ Portfolio",
  description: "Portfolio",
};

const inter = Inter({
    subsets:['latin']
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/08c3f952c9.js" crossorigin="anonymous" />
            <body className={`h-screen p-0 m-0 bg-neutral-950 ${inter.className}`}> {children} </body>
        </html>
    );
}
