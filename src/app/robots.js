import { SITE_URL } from "@/app/lib/seo";

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
