import { PROJECTS } from "@/app/lib/projects";

const SITE_URL = "https://manojtgn.me";

export default function sitemap() {
    const lastModified = new Date();

    const staticRoutes = [
        { url: `${SITE_URL}/`,              changeFrequency: "monthly", priority: 1.0 },
        { url: `${SITE_URL}/work`,          changeFrequency: "monthly", priority: 0.9 },
        { url: `${SITE_URL}/contact`,       changeFrequency: "yearly",  priority: 0.7 },
        { url: `${SITE_URL}/accessibility`, changeFrequency: "yearly",  priority: 0.4 },
    ].map((entry) => ({ ...entry, lastModified }));

    const projectRoutes = PROJECTS.map((p) => ({
        url: `${SITE_URL}/work/${p.slug}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes];
}
