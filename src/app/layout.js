import Script from "next/script";
import { headers } from "next/headers";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import AccessibilityInit from "./components/AccessibilityInit";
import I18nProvider from "./providers/I18nProvider";
import PageTransition from "./components/PageTransition";
import SkipNav from "./components/SkipNav";
import { SITE_URL } from "./lib/seo";

const GA_ID = "G-137RMR5NMV";

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Manoj A ▪ Software Engineer",
        template: "%s",
    },
    description: "Software developer building reliable, performant systems. Explore projects, experience, and contact me.",
    icons: {
        icon: '/favicon.ico',
    },
    keywords: [
        "Manoj A",
        "ManojTGN",
        "Software Engineer",
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
        title: "Manoj A | Software Engineer",
        description: "Software developer building reliable, performant systems. Explore projects, experience, and more.",
        url: SITE_URL,
        siteName: "Manoj A | Portfolio",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Manoj A | Software Engineer",
        description: "Software developer building reliable, performant systems.",
    },
};

const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manoj A",
    alternateName: "ManojTGN",
    url: SITE_URL,
    jobTitle: "Software Engineer",
    worksFor: { "@type": "Organization", name: "Zoho Corporation" },
    image: `${SITE_URL}/images/personal/stamp.png`,
    email: "mailto:manojanguraja@gmail.com",
    sameAs: [
        "https://github.com/ManojTGN",
        "https://www.linkedin.com/in/manojbit/",
        "https://www.youtube.com/@TamilGamersNetworks",
        "https://stackoverflow.com/users/9558827/manoj-a",
        "https://www.instagram.com/_m4n0j_/",
        "https://steamcommunity.com/id/ManojTGN/",
        "https://open.spotify.com/user/31coacig75i7cwnvsalo5yhlmhne",
        "https://www.paypal.com/paypalme/manojtgn",
    ],
};

const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Manoj A | Portfolio",
    url: SITE_URL,
    inLanguage: ["en", "es", "fr", "ta", "zh"],
    author: { "@type": "Person", name: "Manoj A", url: SITE_URL },
};

export default async function RootLayout({ children }) {
    const nonce = (await headers()).get("x-nonce") || undefined;

    return (
        <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://kit.fontawesome.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://ka-f.fontawesome.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <script
                    type="application/ld+json"
                    nonce={nonce}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
                />
                <script
                    type="application/ld+json"
                    nonce={nonce}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
                />
                {/* Tells Font Awesome to stamp its runtime-injected <style> blocks
                    with our CSP nonce so they're not blocked. Must run before the
                    kit script downloads. */}
                <script
                    id="fa-config"
                    nonce={nonce}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: `window.FontAwesomeConfig = Object.assign(window.FontAwesomeConfig || {}, { nonce: ${JSON.stringify(nonce || "")} });`,
                    }}
                />
            </head>
            <body className="m-0 p-0 w-full h-screen dark:bg-portfolio-950 bg-portfolio-50">
                    <I18nProvider>
                        <SkipNav />
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem nonce={nonce}>
                            <AccessibilityInit />
                            <PageTransition>
                                {children}
                            </PageTransition>
                        </ThemeProvider>
                    </I18nProvider>
                    <Analytics />
                    <SpeedInsights />
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                        nonce={nonce}
                    />
                    <Script id="gtag-init" strategy="afterInteractive" nonce={nonce}>
                        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
                    </Script>
                    <Script
                        src="https://kit.fontawesome.com/08c3f952c9.js"
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                        nonce={nonce}
                    />
            </body>
        </html>
    );
}
