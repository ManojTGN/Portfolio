"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";

import PageShell from "../components/PageShell";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "@/app/lib/projects";

export default function WorkClient() {
    const { t } = useTranslation();
    const [view, setView] = useState("COMPACT");

    return (
        <PageShell>
            <div className="mt-5 flex flex-col items-start">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl text-portfolio-950 dark:text-white font-bold">
                    {t("portfolio.topbar.work")}
                </h1>
            </div>
            <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>

            <section aria-labelledby="product-heading">
                <div
                    id="modeSelector"
                    className="sticky top-20 md:top-24 z-30 w-full flex items-center justify-end mt-12"
                >
                    <div
                        className="h-12 text-2xl text-portfolio-500 flex items-center justify-end gap-5 dark:bg-portfolio-950 bg-portfolio-50 px-5 rounded-lg"
                        role="toolbar"
                        aria-label="View mode"
                    >
                        <button
                            onClick={() => setView("MEDIUM")}
                            aria-label="Medium view"
                            aria-pressed={view === "MEDIUM"}
                            className={
                                view === "MEDIUM"
                                    ? "dark:text-portfolio-50 text-portfolio-950"
                                    : " dark:text-portfolio-500 text-portfolio-800 cursor-pointer"
                            }
                        >
                            <i className="fa-solid fa-grip-vertical" aria-hidden="true"></i>
                        </button>
                        <button
                            onClick={() => setView("COMPACT")}
                            aria-label="Compact view"
                            aria-pressed={view === "COMPACT"}
                            className={
                                view === "COMPACT"
                                    ? "dark:text-portfolio-50 text-portfolio-950"
                                    : " dark:text-portfolio-500 text-portfolio-800 cursor-pointer"
                            }
                        >
                            <i className="fa-solid fa-bars" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <h2 id="product-heading" className="text-2xl sm:text-3xl md:text-5xl font-medium">
                    {t("portfolio.work.project.package")}
                </h2>

                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} mode={view} isFirst={index === 0} />
                ))}
            </section>
        </PageShell>
    );
}
