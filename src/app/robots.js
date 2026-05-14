const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://manojtgn.me").replace(/\/$/, "");

/** @type {() => import('next').MetadataRoute.Robots} */
export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
