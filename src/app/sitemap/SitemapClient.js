'use client'

import Link from "next/link";
import { useTranslation } from "react-i18next";

import Topbar from "../components/Topbar";
import FixedTopbar from "../components/FixedTopbar";
import Footer from "../components/Footer";
import { PROJECTS } from "@/app/lib/projects";

const SECTIONS = [
    {
        key: "main",
        labelKey: "portfolio.sitemap.section.main",
        fallback: "Main pages",
        items: [
            { href: "/", labelKey: "portfolio.topbar.home", fallback: "Home" },
            { href: "/work", labelKey: "portfolio.topbar.work", fallback: "Work" },
            { href: "/contact", labelKey: "portfolio.topbar.contact", fallback: "Contact" },
            { href: "/accessibility", labelKey: "portfolio.footer.a11y", fallback: "Accessibility" },
        ],
    },
];

const HOME_ANCHORS = [
    { hash: "aboutMe", labelKey: "portfolio.about.me", fallback: "About me" },
    { hash: "skillTree", labelKey: "portfolio.skills", fallback: "Skills" },
    { hash: "toolset", labelKey: "portfolio.toolset", fallback: "Toolset" },
    { hash: "experience", labelKey: "portfolio.experience", fallback: "Experience" },
    { hash: "contact", labelKey: "portfolio.contact", fallback: "Contact" },
];

function tr(t, key, fallback) {
    const out = t(key);
    return out === key ? fallback : out;
}

export default function SitemapClient() {
    const { t } = useTranslation();

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <FixedTopbar />
            <div className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-[70%] max-w-[1400px] flex flex-col justify-center">
                <Topbar />

                <main id="main-content">
                    <div className="mt-5 flex flex-col items-start">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-portfolio-950 dark:text-white font-bold">
                            {tr(t, "portfolio.sitemap.title", "Sitemap")}
                        </h1>
                        <p className="text-portfolio-500 text-lg mt-2">
                            {tr(t, "portfolio.sitemap.intro", "A human-readable index of every page on this site. Looking for the machine-readable version? See ")}
                            <a href="/sitemap.xml" className="underline hover:text-portfolio-950 dark:hover:text-white">sitemap.xml</a>.
                        </p>
                    </div>

                    <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>

                    <section className="mt-10" aria-labelledby="sitemap-main-heading">
                        <h2 id="sitemap-main-heading" className="font-medium text-2xl md:text-3xl text-portfolio-950 dark:text-white">
                            {tr(t, "portfolio.sitemap.section.main", "Main pages")}
                        </h2>
                        <ul className="mt-4 border-l-2 pl-5 border-portfolio-500 flex flex-col gap-2">
                            {SECTIONS[0].items.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-portfolio-500 hover:text-portfolio-950 dark:hover:text-white underline text-lg">
                                        {tr(t, item.labelKey, item.fallback)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-10" aria-labelledby="sitemap-home-heading">
                        <h2 id="sitemap-home-heading" className="font-medium text-2xl md:text-3xl text-portfolio-950 dark:text-white">
                            {tr(t, "portfolio.sitemap.section.home_sections", "Home sections")}
                        </h2>
                        <ul className="mt-4 border-l-2 pl-5 border-portfolio-500 flex flex-col gap-2">
                            {HOME_ANCHORS.map((a) => (
                                <li key={a.hash}>
                                    <Link href={`/#${a.hash}`} className="text-portfolio-500 hover:text-portfolio-950 dark:hover:text-white underline text-lg">
                                        {tr(t, a.labelKey, a.fallback)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-10" aria-labelledby="sitemap-projects-heading">
                        <h2 id="sitemap-projects-heading" className="font-medium text-2xl md:text-3xl text-portfolio-950 dark:text-white">
                            {tr(t, "portfolio.sitemap.section.projects", "Projects")}
                        </h2>
                        <ul className="mt-4 border-l-2 pl-5 border-portfolio-500 flex flex-col gap-2">
                            {PROJECTS.map((p) => {
                                const niceName = p.slug.replace(/([A-Z])/g, " $1").trim().replace(/^./, c => c.toUpperCase());
                                return (
                                    <li key={p.slug}>
                                        <Link href={`/work/${p.slug}`} className="text-portfolio-500 hover:text-portfolio-950 dark:hover:text-white underline text-lg">
                                            {niceName}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className="mt-10" aria-labelledby="sitemap-machine-heading">
                        <h2 id="sitemap-machine-heading" className="font-medium text-2xl md:text-3xl text-portfolio-950 dark:text-white">
                            {tr(t, "portfolio.sitemap.section.machine", "For machines")}
                        </h2>
                        <ul className="mt-4 border-l-2 pl-5 border-portfolio-500 flex flex-col gap-2">
                            <li><a href="/sitemap.xml" className="text-portfolio-500 hover:text-portfolio-950 dark:hover:text-white underline text-lg">sitemap.xml</a></li>
                            <li><a href="/robots.txt" className="text-portfolio-500 hover:text-portfolio-950 dark:hover:text-white underline text-lg">robots.txt</a></li>
                            <li><a href="/llms.txt" className="text-portfolio-500 hover:text-portfolio-950 dark:hover:text-white underline text-lg">llms.txt</a></li>
                        </ul>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
