import HomeClient from "./HomeClient";
import { hreflangAlternates } from "./lib/seo";

export const metadata = {
    title: "Manoj A ▪ Software Engineer",
    description: "Software developer building reliable, performant systems. Explore projects, experience, skills, and reach out.",
    alternates: hreflangAlternates("/"),
    openGraph: {
        title: "Manoj A | Software Engineer",
        description: "Software developer building reliable, performant systems.",
        url: "/",
    },
};

export default function HomePage() {
    return <HomeClient />;
}
