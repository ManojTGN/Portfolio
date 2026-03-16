'use client'

import Topbar from "@/app/components/Topbar";
import Footer from "@/app/components/Footer";
import Carousel from "@/app/components/Carousel";
import Image from "next/image";
import '../../i18n';
import { useTranslation } from "react-i18next";

const PREVIEW_IMAGES = [
    '/images/work/project/asciiTable/preview_0.jpg',
    '/images/work/project/asciiTable/preview_1.jpg',
    '/images/work/project/asciiTable/preview_2.jpg',
];

const TAGS = [
    'portfolio.work.tags.terminal',
    'portfolio.work.tags.pure_c',
];

const FEATURES = [
    { icon: 'fa-solid fa-table', title: 'portfolio.work.asciitable.f1.title', desc: 'portfolio.work.asciitable.f1.desc' },
    { icon: 'fa-solid fa-filter', title: 'portfolio.work.asciitable.f2.title', desc: 'portfolio.work.asciitable.f2.desc' },
    { icon: 'fa-solid fa-arrow-down-a-z', title: 'portfolio.work.asciitable.f3.title', desc: 'portfolio.work.asciitable.f3.desc' },
    { icon: 'fa-solid fa-palette', title: 'portfolio.work.asciitable.f4.title', desc: 'portfolio.work.asciitable.f4.desc' },
    { icon: 'fa-solid fa-keyboard', title: 'portfolio.work.asciitable.f5.title', desc: 'portfolio.work.asciitable.f5.desc' },
    { icon: 'fa-solid fa-hashtag', title: 'portfolio.work.asciitable.f6.title', desc: 'portfolio.work.asciitable.f6.desc' },
];

const TECH_STACK = [
    { name: 'Pure C', icon: 'fa-solid fa-c', color: 'text-blue-400' },
    { name: 'Terminal', icon: 'fa-solid fa-terminal', color: 'text-green-500' },
    { name: 'Makefile', icon: 'fa-solid fa-gears', color: 'text-portfolio-300' },
];

export default function AsciiTable() {
    const { t, i18n, ready } = useTranslation();

    if (!ready) return <></>;

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="w-11/12 md:w-9/12 lg:w-6/12 flex flex-col">
                <Topbar />
                <hr className="w-full mt-5 border-portfolio-500" />

                <div className="flex items-center justify-between mt-6">
                    <a href="/work" className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors w-fit">
                        <i className="fa-solid fa-arrow-left text-sm"></i>
                        <span className="text-sm font-medium">{t('portfolio.work.detail.back')}</span>
                    </a>
                    <a href="https://github.com/ManojTGN/AsciiTable" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-portfolio-500 hover:text-portfolio-300 transition-colors">
                        <i className="fa-brands fa-github text-lg"></i>
                        <span className="text-sm font-medium">{t('portfolio.work.detail.source_code')}</span>
                    </a>
                </div>

                {/* Hero */}
                <div className="mt-8">
                    <Image
                        src="/images/work/project/asciiTable/asciitable.png"
                        alt="AsciiTable"
                        width={480}
                        height={200}
                        draggable="false"
                    />
                    <p className="text-portfolio-500 text-lg mt-4">
                        {t('portfolio.work.asciitable.desc')}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {TAGS.map(tag => (
                            <span key={tag} className="px-3 py-1 text-sm font-medium rounded-md bg-portfolio-500/10 text-portfolio-300 border border-portfolio-500/20">
                                {t(tag)}
                            </span>
                        ))}
                    </div>
                </div>

                <hr className="w-full mt-10 border-portfolio-500/30" />

                {/* Overview */}
                <section className="mt-10">
                    <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.overview')}</h2>
                    <div className="border-l-2 pl-5 mt-4 border-portfolio-500">
                        <p className="text-portfolio-500 text-lg">
                            {t('portfolio.work.asciitable.desc.short')}
                        </p>
                    </div>
                </section>

                {/* Preview Carousel */}
                <section className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.preview')}</h2>
                    <div className="mt-4 aspect-video">
                        <Carousel showArrow={true} images={PREVIEW_IMAGES} />
                    </div>
                </section>

                {/* Key Features */}
                <section className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.key_features')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {FEATURES.map((feature) => (
                            <div key={feature.title} className="border border-portfolio-500/20 rounded-lg p-4 hover:border-portfolio-500/40 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <i className={`${feature.icon} text-portfolio-300 text-lg`}></i>
                                    <h3 className="font-medium text-lg">{t(feature.title)}</h3>
                                </div>
                                <p className="text-portfolio-500 text-sm">{t(feature.desc)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-medium">{t('portfolio.work.detail.tech_stack')}</h2>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {TECH_STACK.map((tech) => (
                            <div key={tech.name} className="flex items-center gap-2 px-4 py-2 border border-portfolio-500/20 rounded-lg">
                                <i className={`${tech.icon} ${tech.color} text-xl`}></i>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
