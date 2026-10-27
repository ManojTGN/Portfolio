"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { notFound } from "next/navigation";

import PageShell from "@/app/components/PageShell";
import Carousel from "@/app/components/Carousel";
import { getProjectBySlug } from "@/app/lib/projects";
import { LOGO_MAX_WIDTH_CLASS } from "@/app/lib/ui";

export default function ProjectClient({ slug }) {
    const { t } = useTranslation();
    const project = getProjectBySlug(slug);

    if (!project) return notFound();

    const hasPreview =
        project.previewImages.length > 1 ||
        (project.previewImages.length === 1 && !project.previewImages[0].includes("noPreview"));

    return (
        <PageShell>
            <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>
            <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
                <Link
                    href="/work"
                    className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors w-fit"
                >
                    <i className="fa-solid fa-arrow-left text-sm" aria-hidden="true"></i>
                    <span className="text-sm font-medium">{t("portfolio.work.detail.back")}</span>
                </Link>
                <div className="flex items-center gap-4 flex-wrap">
                    {project.npmLink && (
                        <a
                            href={project.npmLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors"
                        >
                            <i className="fa-brands fa-npm text-lg"></i>
                            <span className="text-sm font-medium">{t("portfolio.work.detail.npm")}</span>
                        </a>
                    )}
                    <a
                        href={`https://github.com/${project.githubRepo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors"
                    >
                        <i className="fa-brands fa-github text-lg"></i>
                        <span className="text-sm font-medium">{t("portfolio.work.detail.source_code")}</span>
                    </a>
                </div>
            </div>

            <div className="mt-8">
                <h1 className="sr-only">{project.name}</h1>
                <Image
                    src={project.logoSrc}
                    alt={project.name}
                    width={project.logoSize.width}
                    height={project.logoSize.height}
                    draggable="false"
                    priority
                    className={`h-auto w-full ${LOGO_MAX_WIDTH_CLASS[project.heroWidth] ?? "max-w-[1080px]"}`}
                />
                <p className="text-portfolio-500 text-lg mt-4">{t(project.desc)}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-sm font-medium rounded-md bg-portfolio-500/10 text-portfolio-300 border border-portfolio-500/20"
                        >
                            {t(tag)}
                        </span>
                    ))}
                </div>
            </div>

            <hr className="w-full mt-10 border-portfolio-500/30" />

            {project.overviewDescs && (
                <section className="mt-10">
                    <h2 className="text-2xl md:text-3xl font-medium">{t("portfolio.work.detail.overview")}</h2>
                    <div className="border-l-2 pl-5 mt-4 border-portfolio-500">
                        {project.overviewDescs.map((desc, i) => (
                            <p key={i} className={`text-portfolio-500 text-lg ${i > 0 ? "mt-4" : ""}`}>
                                {t(desc)}
                            </p>
                        ))}
                    </div>
                </section>
            )}

            {hasPreview && (
                <section className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-medium">{t("portfolio.work.detail.preview")}</h2>
                    <div className="mt-4 aspect-video">
                        <Carousel
                            showArrow={project.showArrow !== false}
                            images={project.previewImages}
                            label={project.name}
                        />
                    </div>
                </section>
            )}

            <section className={hasPreview ? "mt-12" : "mt-10"}>
                <h2 className="text-2xl md:text-3xl font-medium">{t("portfolio.work.detail.key_features")}</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-5">
                    {project.features.map((feature) => (
                        <li key={feature.title} className="border-l-2 pl-5 border-portfolio-500">
                            <h3 className="flex items-center gap-2 text-portfolio-950 dark:text-white font-medium">
                                <i className={`${feature.icon} text-portfolio-500`} aria-hidden="true"></i>
                                {t(feature.title)}
                            </h3>
                            <p className="text-portfolio-500 text-sm mt-1">{t(feature.desc)}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl md:text-3xl font-medium">{t("portfolio.work.detail.tech_stack")}</h2>
                <div className="flex flex-wrap gap-3 mt-4">
                    {project.techStack.map((tech) => (
                        <div
                            key={tech.name}
                            className="flex items-center gap-2 px-4 py-2 border border-portfolio-500/20 rounded-lg"
                        >
                            <i className={`${tech.icon} ${tech.color} text-xl`} aria-hidden="true"></i>
                            <span className="font-medium text-sm">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </PageShell>
    );
}
