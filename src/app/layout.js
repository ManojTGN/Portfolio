import Script from "next/script";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import AccessibilityInit from "./components/AccessibilityInit";
import I18nProvider from "./providers/I18nProvider";
import PageTransition from "./components/PageTransition";
import SkipNav from "./components/SkipNav";

export const metadata = {
    metadataBase: new URL("https://manojtgn.me"),
    title: {
        default: "Manoj A \u25aa Software Developer",
        template: "%s",
    },
    description: "Software developer building reliable, performant systems. Explore projects, experience, and contact me.",
    icons: {
        icon: '/favicon.ico',
    },
    keywords: [
        "Manoj A",
        "ManojTGN",
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
        description: "Software developer building reliable, performant systems. Explore projects, experience, and more.",
        url: "https://manojtgn.me",
        siteName: "Manoj A \u2014 Portfolio",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Manoj A | Software Developer",
        description: "Software developer building reliable, performant systems.",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Script src="https://kit.fontawesome.com/08c3f952c9.js" crossOrigin="anonymous" />
            </head>
            <body className="m-0 p-0 w-full h-screen dark:bg-portfolio-950 bg-portfolio-50">
                    <I18nProvider>
                        <SkipNav />
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
