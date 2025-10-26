'use client'

import { useTranslation } from "react-i18next";

import Topbar from "./components/Topbar";
import Name from "./components/Name";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";

export default function Home() {
    const {t, i18n, ready } = useTranslation();
    if (!ready) return <></>;

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-6/12 flex flex-col justify-center">
                    <Topbar />

                    <div className="mt-5 flex flex-col items-start">
                        <Name />
                        <span className="text-portfolio-500 text-xl font-medium mt-1">{t('portfolio.about.me.role')}</span>
                        <span className="text-portfolio-500 font-medium"><i className="fa-solid fa-location-dot"></i> {t('portfolio.location')}</span>        
                    </div>

                    <hr className="w-full mt-5 border-portfolio-500" />
                    <div className="flex items-center w-full mt-16 gap-2" id="aboutMe">
                        <a href="#aboutMe" className="w-full font-medium text-4xl text-white">{t('portfolio.about.me')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.about.me.fun')}</p>
                    </div>
                    <p className="text-portfolio-500 text-lg italic">
                        {t('portfolio.about.me.desc.short')}
                    </p>
                    <p className="text-portfolio-500 text-base mt-5 font-normal">
                        {t('portfolio.about.me.desc.top')} {t('portfolio.about.me.desc.bottom')}
                    </p>

                    <div className="flex items-center w-full mt-16 gap-2" id="skillTree">
                        <a href="#skillTree" className="w-full font-medium text-4xl text-white">{t('portfolio.skills')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.skills.fun')}</p>
                    </div>
                    <Skills />

                    <div className="flex items-center w-full mt-16 gap-2" id="experience">
                        <a href="#experience" className="w-full font-medium text-4xl text-white">{t('portfolio.experience')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.experience.fun')}</p>
                    </div>
                    <Experiences />

                    <div className="flex items-center w-full mt-16 gap-2" id="education">
                        <a href="#education" className="w-full font-medium text-4xl text-white">{t('portfolio.education')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.education.fun')}</p>
                    </div>
                    <div className="mt-5 border-l pl-5 border-portfolio-500">
                        <p className="text-white font-medium text-lg">Bachelor&apos;s Of Information Science & Engineering</p>
                        <p className="text-portfolio-500 font-medium">2020 - 2024</p>
                        <p className="text-portfolio-500">Bannari Amman Institute Of Technology</p>
                    </div>

                    <div className="flex items-center w-full mt-16 gap-2" id="contact">
                        <a href="#contact" className="w-full font-medium text-4xl text-white">{t('portfolio.contact')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.contact.fun')}</p>
                    </div>
                    <Contact />
                    
                    <Footer />
                </div>
            </div>
        </>
    );
}
