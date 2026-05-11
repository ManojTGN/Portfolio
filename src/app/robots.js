const SITE_URL = "https://manojtgn.me";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Block the API surface from being crawled — it's transactional only.
                disallow: ["/api/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
