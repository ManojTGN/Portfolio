'use client'

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Carousel from "./Carousel";

const BORDER = "border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500";

export default function ProjectCard({ project, mode, isFirst }) {
    const { t } = useTranslation();

    const marginTop = isFirst
        ? 'mt-5'
        : mode === 'LARGE' ? 'mt-32' : mode === 'MEDIUM' ? 'mt-16' : 'mt-8';

    const logoWidth = project.logoWidth?.[mode] ?? 1080;

    if (mode === 'LARGE') {
        return (
            <>
                <a href={`/work/${project.slug}`}>
                    <div className={`${BORDER} ${marginTop}`}>
                        <Image src={project.logoSrc} alt="" draggable="false" width={logoWidth} height={200} />
                        <p className="text-portfolio-500 text-lg">{t(project.desc)}</p>
                    </div>
                </a>
                <div className={`aspect-video ${BORDER} pt-3`}>
                    <Carousel showArrow={project.showArrow} images={project.previewImages} />
                </div>
                <a href={`/work/${project.slug}`}>
                    <div className={`${BORDER} pt-3`}>
                        {project.longDesc && (
                            <p className="text-portfolio-500 text-lg">{t(project.longDesc)}</p>
                        )}
                        <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                            <span className="text-portfolio-50 font-medium">Tags:</span>
                            {project.tags.map(tag => <span key={tag}>{t(tag)}</span>)}
                        </div>
                    </div>
                </a>
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
                    <a href={`/work/${project.slug}`}>
                        <Image src={project.logoSrc} alt="" draggable="false" width={logoWidth} height={200} />
                        <p className={`text-portfolio-500 text-lg ${project.longDesc ? 'line-clamp-2' : 'line-clamp-3'}`}>
                            {t(project.desc)}
                        </p>
                        {project.longDesc && (
                            <p className="text-portfolio-500 text-lg line-clamp-2">{t(project.longDesc)}</p>
                        )}
                        <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                            <span className="text-portfolio-50 font-medium">Tags:</span>
                            {project.tags.map(tag => <span key={tag}>{t(tag)}</span>)}
                        </div>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <a href={`/work/${project.slug}`}>
            <div className={`${BORDER} ${marginTop}`}>
                <Image src={project.logoSrc} alt="" draggable="false" width={logoWidth} height={200} />
                <p className="text-portfolio-500 text-lg">{t(project.compactDesc || project.desc)}</p>
            </div>
        </a>
    );
}
