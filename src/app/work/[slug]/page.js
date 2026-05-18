import { getProjectBySlug, PROJECTS } from "@/app/lib/projects";
import ProjectClient from "./ProjectClient";
import { hreflangAlternates } from "@/app/lib/seo";

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
    const title = `${niceName} ▪ Project by Manoj A ▪ Features & Tech Stack`;
    const description = `Deep dive into ${niceName}: overview, screenshots, key features, tech stack, and source code. One of the projects built and shipped by Manoj A.`;
    return {
        title,
        description,
        alternates: hreflangAlternates(`/work/${project.slug}`),
        openGraph: {
            title: `${niceName} | Project by Manoj A`,
            description,
            url: `/work/${project.slug}`,
        },
    };
}

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    return <ProjectClient slug={slug} />;
}
