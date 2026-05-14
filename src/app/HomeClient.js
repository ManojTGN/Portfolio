'use client'

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

import Topbar from "./components/Topbar";
import FixedTopbar from "./components/FixedTopbar";
import Name from "./components/Name";
import Skills from "./components/Skills";
import Toolsets from "./components/Toolsets";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function HomeClient() {
    const { t, ready } = useTranslation();

    useEffect(() => {
        if (!ready) return;

        const hash = window.location.hash;
        if (hash) {
            const el = document.getElementById(hash.substring(1));
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    }, [ready]);

    if (!ready) return null;

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <FixedTopbar />
            <div className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-[70%] max-w-[1400px] flex flex-col justify-center">
                <Topbar />

                <main id="main-content">
                    <div className="mt-5 flex flex-col items-start">
                        <Name />
                        <span className="text-portfolio-950 dark:text-portfolio-500 text-xl font-medium mt-1">{t('portfolio.about.me.role')}</span>
                        <span className="text-portfolio-950 dark:text-portfolio-500 font-medium"><i className="fa-solid fa-location-dot" aria-hidden="true"></i> {t('portfolio.location')}</span>
                    </div>

                    <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>

                    <section id="aboutMe" className="mt-16" aria-labelledby="aboutMe-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="aboutMe-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.about.me')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.about.me.fun')}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start gap-5 md:gap-8">
                            <div className="flex-1">
                                <p className="text-portfolio-500 text-lg italic">
                                    {t('portfolio.about.me.desc.short')}
                                </p>
                                <br/>
                                <p className="text-portfolio-500 text-3xl sm:text-4xl md:text-5xl font-bold italic mt-2">
                                    {t('portfolio.about.me.tagline')}
                                </p>
                                <br/>
                                <p className="text-portfolio-500 text-base mt-5 font-normal">
                                    {t('portfolio.about.me.desc')}
                                </p>
                            </div>
                            <div className="shrink-0 flex flex-col items-center md:items-stretch gap-4 self-center md:self-start">
                                <Image
                                    src="/images/personal/stamp.png"
                                    alt={t('portfolio.about.me.stamp.alt')}
                                    width={600}
                                    height={700}
                                    className="w-64 sm:w-72 lg:w-80 h-auto rotate-3 drop-shadow-xl"
                                    priority
                                    draggable={false}
                                />
                                <a
                                    href="https://drive.google.com/file/d/1YkDWnFv27z7AQwdJki7xhn-cPGYZLFox/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track('resume_clicked')}
                                    className="group w-64 sm:w-72 lg:w-80 flex items-center font-medium text-portfolio-950 dark:text-portfolio-950 dark:border-portfolio-950 dark:bg-portfolio-400 dark:hover:border-white dark:hover:text-white border-2 p-2"
                                >
                                    <span className="w-full">{t('portfolio.about.me.download.resume')}</span>
                                    <span className="text-end" aria-hidden="true">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-5 md:gap-0">
                            <div className="border-l-2 pl-3 border-portfolio-500 flex gap-4 items-center">
                                <i className="fa-regular fa-calendar text-4xl text-portfolio-500" aria-hidden="true"></i>
                                <div>
                                    <p className="text-2xl font-medium">{t('portfolio.about.me.years')}</p>
                                    <p className="text-portfolio-500">{t('portfolio.about.me.experience')}</p>
                                </div>
                            </div>
                            <div className="border-l-2 pl-5 border-portfolio-500 flex gap-4 items-center">
                                <i className="fa-solid fa-kaaba text-4xl text-portfolio-500" aria-hidden="true"></i>
                                <div>
                                    <p className="text-2xl font-medium">{t('portfolio.about.me.projects')}</p>
                                    <p className="text-portfolio-500">{t('portfolio.about.me.worked')}</p>
                                </div>
                            </div>
                            <div className="border-l-2 pl-5 border-portfolio-500 flex gap-4 items-center">
                                <i className="fa-solid fa-toolbox text-4xl text-portfolio-500" aria-hidden="true"></i>
                                <div>
                                    <p className="text-2xl font-medium">{t('portfolio.about.me.tools')}</p>
                                    <p className="text-portfolio-500">{t('portfolio.about.me.tools.coding.language')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="skillTree" className="mt-16 md:mt-32" aria-labelledby="skills-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="skills-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.skills')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.skills.fun')}</p>
                        </div>
                        <Skills />
                    </section>

                    <section id="toolset" className="mt-16 md:mt-32" aria-labelledby="toolset-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="toolset-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.toolset')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.toolset.fun')}</p>
                        </div>
                        <Toolsets />
                    </section>

                    <section id="experience" className="mt-16 md:mt-32" aria-labelledby="experience-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="experience-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.experience')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.experience.fun')}</p>
                        </div>
                        <Experiences />
                    </section>

                    <section id="contact" className="mt-16 md:mt-32" aria-labelledby="contact-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="contact-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.contact')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.contact.fun')}</p>
                        </div>
                        <Contact />
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
