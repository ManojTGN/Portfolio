'use client'

import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Carousel from "./Carousel";

const BORDER = "border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500";

export default function ProjectCard({ project, mode, isFirst }) {
    const { t } = useTranslation();

    const logoWidth = project.logoWidth?.[mode] ?? 1080;
    const marginTop = isFirst ? 'mt-5'
                    : mode === 'LARGE' ? 'mt-32' : mode === 'MEDIUM' ? 'mt-16' : 'mt-8';

    if (mode === 'LARGE') {
        return (
            <>
                <Link href={`/work/${project.slug}`} className="inline-block px-2 py-1">
                    <div className={`${BORDER} ${marginTop}`}>
                        <Image src={project.logoSrc} alt="" draggable="false" width={logoWidth} height={200} />
                        <p className="text-portfolio-500 text-lg">{t(project.desc)}</p>
                    </div>
                </Link>
                <div className={`aspect-video ${BORDER} pt-3`}>
                    <Carousel showArrow={project.showArrow} images={project.previewImages} />
                </div>
                <Link href={`/work/${project.slug}`} className="inline-block px-2 py-1">
                    <div className={`${BORDER} pt-3`}>
                        {project.longDesc && (
                            <p className="text-portfolio-500 text-lg">{t(project.longDesc)}</p>
                        )}
                        <div className="flex flex-wrap gap-2 pt-3">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-sm font-medium rounded-md bg-portfolio-500/10 text-portfolio-300 border border-portfolio-500/20">
                                    {t(tag)}
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
            </>
        );
    }

    if (mode === 'MEDIUM') {
        return (
            <div className={`${BORDER} ${marginTop} flex flex-col xl:flex-row gap-5`}>
                <div className="w-full aspect-video">
                    <Carousel showArrow={project.showArrow} images={project.previewImages} />
                </div>
                <div className="w-full">
                    <Link href={`/work/${project.slug}`} className="inline-block px-2 py-1">
                        <Image src={project.logoSrc} alt="" draggable="false" width={logoWidth} height={200} />
                        <p className={`text-portfolio-500 text-lg ${project.longDesc ? 'line-clamp-2' : 'line-clamp-3'}`}>
                            {t(project.desc)}
                        </p>
                        {project.longDesc && (
                            <p className="text-portfolio-500 text-lg line-clamp-2">{t(project.longDesc)}</p>
                        )}
                        <div className="flex flex-wrap gap-2 pt-3">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-sm font-medium rounded-md bg-portfolio-500/10 text-portfolio-300 border border-portfolio-500/20">
                                    {t(tag)}
                                </span>
                            ))}
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Link href={`/work/${project.slug}`} className="inline-block px-2 py-1">
            <div className={`${BORDER} ${marginTop}`}>
                <Image src={project.logoSrc} alt="" draggable="false" width={logoWidth} height={200} />
                <p className="text-portfolio-500 text-lg">{t(project.compactDesc || project.desc)}</p>
            </div>
        </Link>
    );
}
