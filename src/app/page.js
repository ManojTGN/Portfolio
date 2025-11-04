'use client'

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import Topbar from "./components/Topbar";
import Name from "./components/Name";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import Carousel from "./components/Carousel";

export default function Home() {
    const {t, i18n, ready } = useTranslation();
    
    const [randomImages, setRandomImages] = useState([]);
    const [selfieImages, setSelfieImages] = useState([]);
    const [bikesImages, setBikesImages] = useState([]);

    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash;
            if (hash) {
                const el = document.getElementById(hash.substring(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }
        };
        
        let random = [];
        for(let i = 1; i < 23; i++) random.push(`/images/random_${i}.jpg`);
        random.sort(() => Math.random() - 0.5);
        setRandomImages(random);

        let selfie = [];
        for(let i = 1; i < 5; i++) selfie.push(`/images/me_${i}.jpg`);
        selfie.sort(() => Math.random() - 0.5);
        setSelfieImages(selfie);

        let bike = [];
        for(let i = 1; i < 10; i++) bike.push(`/images/bike_${i}.jpg`);
        bike.sort(() => Math.random() - 0.5);
        setBikesImages(bike);

        if(ready) scrollToHash()
    }, [ready]);

    if (!ready) return <></>;
    
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-6/12 flex flex-col justify-center">
                    <Topbar />

                    <div className="mt-5 flex flex-col items-start">
                        <Name />
                        <span className="text-portfolio-950 dark:text-portfolio-500 text-xl font-medium mt-1">{t('portfolio.about.me.role')}</span>
                        <span className="text-portfolio-950 dark:text-portfolio-500 font-medium"><i className="fa-solid fa-location-dot"></i> {t('portfolio.location')}</span>        
                    </div>

                    <hr className="w-full mt-5 border-portfolio-950 dark:border-portfolio-500" />
                    <div className="flex items-center w-full mt-16 gap-2" id="aboutMe">
                        <a href="#aboutMe" className="w-full font-medium text-4xl text-portfolio-950 dark:text-white">{t('portfolio.about.me')}</a>
                        <p className="w-full text-end text-portfolio-500 dark:text-portfolio-700 text-3xl font-medium">{t('portfolio.about.me.fun')}</p>
                    </div>
                    <p className="text-portfolio-500 dark:text-portfolio-500 text-lg italic">
                        {t('portfolio.about.me.desc.short')}
                    </p>
                    <p className="text-portfolio-500 dark:text-portfolio-500 text-base mt-5 font-normal">
                        {t('portfolio.about.me.desc.top')} {t('portfolio.about.me.desc.bottom')}
                    </p>

                    <div className="mt-5 grid grid-cols-3 grid-rows-1">
                        <div className="border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500">
                            <p className="text-2xl font-medium">2+ Years</p>
                            <p className="text-portfolio-500">Experience</p>
                        </div>
                        <div className="border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500">
                            <p className="text-2xl font-medium">7+ Projects</p>
                            <p className="text-portfolio-500">Worked</p>
                        </div>
                        <div className="border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500">
                            <p className="text-2xl font-medium">20+ Tools</p>
                            <p className="text-portfolio-500">Tools & Coding Language</p>
                        </div>
                    </div>
    
                    <div className="grid grid-cols-3 grid-rows-1 gap-2 mt-10 h-[600px]">
                        <div className="w-full h-full flex flex-col gap-2 justify-end">
                            <p className="font-bold text-7xl">Random</p>
                            <div className="w-full h-[300px]">
                                <Carousel showArrow={false} images={randomImages} />
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col gap-2 justify-center">
                            <div className="w-full h-[500px]">
                                <Carousel showArrow={false} images={selfieImages} />
                            </div>
                            <p className="font-bold text-7xl">Selfiee&apos;s</p>
                        </div>
                        <div className="w-full h-full flex flex-col gap-2 justify-start">
                            <p className="font-bold text-7xl">Bike</p>
                            <div className="w-full h-[300px]">
                                <Carousel showArrow={false} images={bikesImages} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center w-full mt-32 gap-2" id="featured">
                        <a href="#featured" className="w-full font-medium text-4xl text-portfolio-950 dark:text-white">{t('portfolio.featured')}</a>
                        <p className="w-full text-end text-portfolio-500 dark:text-portfolio-700 text-3xl font-medium">{t('portfolio.featured.fun')}</p>
                    </div>
                    <Featured />

                    <div className="flex items-center w-full mt-32 gap-2" id="skillTree">
                        <a href="#skillTree" className="w-full font-medium text-4xl text-portfolio-950 dark:text-white">{t('portfolio.skills')}</a>
                        <p className="w-full text-end text-portfolio-500 dark:text-portfolio-700 text-3xl font-medium">{t('portfolio.skills.fun')}</p>
                    </div>
                    <Skills />

                    <div className="flex items-center w-full mt-32 gap-2" id="experience">
                        <a href="#experience" className="w-full font-medium text-4xl text-portfolio-950 dark:text-white">{t('portfolio.experience')}</a>
                        <p className="w-full text-end text-portfolio-500 dark:text-portfolio-700 text-3xl font-medium">{t('portfolio.experience.fun')}</p>
                    </div>
                    <Experiences />

                    <div className="flex items-center w-full mt-32 gap-2" id="education">
                        <a href="#education" className="w-full font-medium text-4xl text-portfolio-950 dark:text-white">{t('portfolio.education')}</a>
                        <p className="w-full text-end text-portfolio-500 dark:text-portfolio-700 text-3xl font-medium">{t('portfolio.education.fun')}</p>
                    </div>
                    <div className="mt-5 border-l pl-5 border-portfolio-500 dark:border-portfolio-500">
                        <p className="dark:text-white font-medium text-lg">Bachelor&apos;s Of Information Science & Engineering</p>
                        <p className="text-portfolio-500 dark:text-portfolio-500 font-medium">2020 - 2024</p>
                        <p className="text-portfolio-500 dark:text-portfolio-500">Bannari Amman Institute Of Technology</p>
                    </div>

                    <div className="flex items-center w-full mt-32 gap-2" id="contact">
                        <a href="#contact" className="w-full font-medium text-4xl text-portfolio-950 dark:text-white">{t('portfolio.contact')}</a>
                        <p className="w-full text-end text-portfolio-500 dark:text-portfolio-700 text-3xl font-medium">{t('portfolio.contact.fun')}</p>
                    </div>
                    <Contact />
                    
                    <Footer />
                </div>
            </div>
        </>
    );
}
