'use client'

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Link from "next/link";

import Topbar from "./components/Topbar";
import Name from "./components/Name";
import Skills from "./components/Skills";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function Home() {
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
            <div className="w-11/12 md:w-9/12 lg:w-6/12 flex flex-col justify-center">
                <Topbar />

                <main id="main-content">
                    <div className="mt-5 flex flex-col items-start">
                        <Name />
                        <span className="text-portfolio-950 dark:text-portfolio-500 text-xl font-medium mt-1">{t('portfolio.about.me.role')}</span>
                        <span className="text-portfolio-950 dark:text-portfolio-500 font-medium"><i className="fa-solid fa-location-dot" aria-hidden="true"></i> {t('portfolio.location')}</span>
                    </div>

                    <hr className="w-full mt-5 border-portfolio-950 dark:border-portfolio-500" aria-hidden="true" />

                    <section id="aboutMe" className="mt-16" aria-labelledby="aboutMe-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="aboutMe-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.about.me')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.about.me.fun')}</p>
                        </div>
                        <p className="text-portfolio-500 text-lg italic">
                            {t('portfolio.about.me.desc.short')}
                        </p>
                        <p className="text-portfolio-500 text-base mt-5 font-normal">
                            {t('portfolio.about.me.desc.top')} {t('portfolio.about.me.desc.bottom')}
                        </p>

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-5 md:gap-0">
                            <div className="border-l-2 pl-5 border-portfolio-500">
                                <p className="text-2xl font-medium">{t('portfolio.about.me.years')}</p>
                                <p className="text-portfolio-500">{t('portfolio.about.me.experience')}</p>
                            </div>
                            <div className="border-l-2 pl-5 border-portfolio-500">
                                <p className="text-2xl font-medium">{t('portfolio.about.me.projects')}</p>
                                <p className="text-portfolio-500">{t('portfolio.about.me.worked')}</p>
                            </div>
                            <div className="border-l-2 pl-5 border-portfolio-500">
                                <p className="text-2xl font-medium">{t('portfolio.about.me.tools')}</p>
                                <p className="text-portfolio-500">{t('portfolio.about.me.tools.coding.language')}</p>
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

                    <section id="experience" className="mt-16 md:mt-32" aria-labelledby="experience-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="experience-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.experience')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.experience.fun')}</p>
                        </div>
                        <Experiences />
                    </section>

                    <section id="education" className="mt-16 md:mt-32" aria-labelledby="education-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="education-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.education')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.education.fun')}</p>
                        </div>
                        <div className="mt-5 border-l pl-5 border-portfolio-500">
                            <p className="dark:text-white font-medium text-lg">{t('portfolio.education.bachelors')}</p>
                            <p className="text-portfolio-500 font-medium">2020 - 2024</p>
                            <p className="text-portfolio-500">{t('portfolio.education.college')}</p>
                        </div>
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
