import { getProjectBySlug, PROJECTS } from "@/app/lib/projects";
import ProjectClient from "./ProjectClient";

// Pre-generate metadata for known project slugs. Falls back to a generic title
// when a slug isn't recognised (the client also calls notFound() in that case).
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) {
        return {
            title: "Not found ▪ Manoj A",
            robots: { index: false, follow: false },
        };
    }
    const niceName = (project.slug || "").replace(/([A-Z])/g, " $1").trim().replace(/^./, c => c.toUpperCase());
    return {
        title: `${niceName} ▪ Manoj A`,
        description: `Details, features, and tech stack for the ${niceName} project.`,
        alternates: { canonical: `/work/${project.slug}` },
        openGraph: {
            title: `${niceName} | Manoj A`,
            description: `Details, features, and tech stack for the ${niceName} project.`,
            url: `/work/${project.slug}`,
        },
    };
}

// Statically generate every known project page at build time.
export function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    return <ProjectClient slug={slug} />;
}
