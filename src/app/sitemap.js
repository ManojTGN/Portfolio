import { PROJECTS } from "@/app/lib/projects";
import { SITE_URL } from "@/app/lib/seo";

/** @type {() => import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
    const lastModified = new Date();

    const staticRoutes = [
        { path: "/",              changeFrequency: "monthly", priority: 1.0 },
        { path: "/work",          changeFrequency: "monthly", priority: 0.9 },
        { path: "/sitemap",       changeFrequency: "monthly", priority: 0.5 },
        { path: "/contact",       changeFrequency: "yearly",  priority: 0.7 },
        { path: "/accessibility", changeFrequency: "yearly",  priority: 0.4 },
    ].map(({ path, changeFrequency, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified,
        changeFrequency,
        priority,
    }));

    const projectRoutes = PROJECTS.map((p) => ({
        url: `${SITE_URL}/work/${p.slug}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes];
}
