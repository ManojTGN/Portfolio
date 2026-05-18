import HomeClient from "./HomeClient";
import { hreflangAlternates } from "./lib/seo";

export const metadata = {
    title: "Manoj A ▪ Software Engineer at Zoho ▪ Projects & Portfolio",
    description: "Software engineer at Zoho building reliable, performant systems. Explore my projects, work experience, technical skills, and reach out for collaboration.",
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
