import WorkClient from "./WorkClient";
import { hreflangAlternates } from "@/app/lib/seo";

export const metadata = {
    title: "Work & Projects ▪ Manoj A ▪ Software Engineer Portfolio",
    description: "Projects, npm packages, YouTube content, photoshop battles, and Steam guides I've built and shipped. Explore the full catalog of work by Manoj A.",
    alternates: hreflangAlternates("/work"),
    openGraph: {
        title: "Work | Manoj A",
        description: "Projects, packages, content, photoshop battles, and Steam guides.",
        url: "/work",
    },
};

export default function WorkPage() {
    return <WorkClient />;
}
