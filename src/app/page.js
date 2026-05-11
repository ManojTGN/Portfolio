import HomeClient from "./HomeClient";

export const metadata = {
    title: "Manoj A ▪ Software Developer",
    description: "Software developer building reliable, performant systems. Explore projects, experience, skills, and reach out.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Manoj A | Software Developer",
        description: "Software developer building reliable, performant systems.",
        url: "/",
    },
};

export default function HomePage() {
    return <HomeClient />;
}
