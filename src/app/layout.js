import Script from "next/script";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import AccessibilityInit from "./components/AccessibilityInit";
import I18nProvider from "./providers/I18nProvider";
import PageTransition from "./components/PageTransition";

export const metadata = {
    title: "ManojTGN \u25aa Portfolio",
    description: "Portfolio",
    icons: {
        icon: '/favicon.ico',
    },
    keywords: [
        "Manoj A",
        "Software Developer",
        "Portfolio",
        "Next.js",
        "Zoho",
        "Web Developer",
    ],
    authors: [{ name: "Manoj A" }],
    creator: "Manoj A",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Manoj A | Software Developer",
        description: "Explore my projects and experience.",
        url: "https://manojtgn.me",
        // images: [
        //     {
        //     url: "/preview.png",
        //     width: 1200,
        //     height: 630,
        //     },
        // ],
        type: "website",
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Script src="https://kit.fontawesome.com/08c3f952c9.js" crossOrigin="anonymous" />
            </head>
            <body className="m-0 p-0 w-full h-screen dark:bg-portfolio-950 bg-portfolio-50">
                    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-portfolio-950 focus:text-white focus:px-4 focus:py-2 focus:rounded"> Skip Navigation </a>
                    <I18nProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <AccessibilityInit />
                            <PageTransition>
                                {children}
                            </PageTransition>
                        </ThemeProvider>
                    </I18nProvider>
            </body>
        </html>
    );
}
