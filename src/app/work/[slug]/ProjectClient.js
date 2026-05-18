'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { notFound } from 'next/navigation';

import Topbar from '@/app/components/Topbar';
import FixedTopbar from '@/app/components/FixedTopbar';
import Footer from '@/app/components/Footer';
import Carousel from '@/app/components/Carousel';
import { getProjectBySlug } from '@/app/lib/projects';

export default function ProjectClient({ slug }) {
    const { t } = useTranslation();
    const project = getProjectBySlug(slug);

    if (!project) return notFound();

    const hasPreview = project.previewImages.length > 1 ||
        (project.previewImages.length === 1 && !project.previewImages[0].includes('noPreview'));

    const niceName = project.slug.replace(/([A-Z])/g, ' $1').trim().replace(/^./, c => c.toUpperCase());

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <FixedTopbar triggerOffset={100} />
            <div className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-[70%] max-w-[1400px] flex flex-col">
                <Topbar />

                <main id="main-content">
                <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>
                <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
                    <Link href="/work" className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors w-fit">
                        <i className="fa-solid fa-arrow-left text-sm" aria-hidden="true"></i>
                        <span className="text-sm font-medium">{t('portfolio.work.detail.back')}</span>
                    </Link>
                    <div className="flex items-center gap-4 flex-wrap">
                        {project.npmLink && (
                            <a href={project.npmLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors">
                                <i className="fa-brands fa-npm text-lg"></i>
                                <span className="text-sm font-medium">{t('portfolio.work.detail.npm')}</span>
                            </a>
                        )}
                        <a href={`https://github.com/${project.githubRepo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors">
                            <i className="fa-brands fa-github text-lg"></i>
                            <span className="text-sm font-medium">{t('portfolio.work.detail.source_code')}</span>
                        </a>
                    </div>
                </div>

                <div className="mt-8">
                    <h1 className="sr-only">{niceName}</h1>
                    <Image
                        src={project.logoSrc}
                        alt={niceName}
                        width={project.heroWidth}
                        height={200}
                        draggable="false"
                    />
                    <p className="text-portfolio-500 text-lg mt-4">
                        {t(project.desc)}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-sm font-medium rounded-md bg-portfolio-500/10 text-portfolio-300 border border-portfolio-500/20">
                                {t(tag)}
                            </span>
                        ))}
                    </div>
                </div>

                <hr className="w-full mt-10 border-portfolio-500/30" />

                {project.overviewDescs && (
                    <section className="mt-10">
                        <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.overview')}</h2>
                        <div className="border-l-2 pl-5 mt-4 border-portfolio-500">
                            {project.overviewDescs.map((desc, i) => (
                                <p key={i} className={`text-portfolio-500 text-lg ${i > 0 ? 'mt-4' : ''}`}>
                                    {t(desc)}
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                {hasPreview && (
                    <section className="mt-12">
                        <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.preview')}</h2>
                        <div className="mt-4 aspect-video">
                            <Carousel showArrow={project.showArrow !== false} images={project.previewImages} label={niceName} />
                        </div>
                    </section>
                )}

                <section className={hasPreview ? "mt-12" : "mt-10"}>
                    <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.key_features')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {project.features.map((feature) => (
                            <div key={feature.title} className="border border-portfolio-500/20 rounded-lg p-4 hover:border-portfolio-500/40 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <i className={`${feature.icon} text-portfolio-300 text-lg`} aria-hidden="true"></i>
                                    <h3 className="font-medium text-lg">{t(feature.title)}</h3>
                                </div>
                                <p className="text-portfolio-500 text-sm">{t(feature.desc)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.tech_stack')}</h2>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {project.techStack.map((tech) => (
                            <div key={tech.name} className="flex items-center gap-2 px-4 py-2 border border-portfolio-500/20 rounded-lg">
                                <i className={`${tech.icon} ${tech.color} text-xl`} aria-hidden="true"></i>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
