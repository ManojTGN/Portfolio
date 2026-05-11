import WorkClient from "./WorkClient";

export const metadata = {
    title: "Work ▪ Manoj A",
    description: "Projects, packages, content, photoshop battles, and Steam guides I've built and shipped.",
    alternates: { canonical: "/work" },
    openGraph: {
        title: "Work | Manoj A",
        description: "Projects, packages, content, photoshop battles, and Steam guides.",
        url: "/work",
    },
};

export default function WorkPage() {
    return <WorkClient />;
}
