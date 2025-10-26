'use client'

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";

import Topbar from "./components/Topbar";
import Name from "./components/Name";

export default function Home() {
    const {t, i18n } = useTranslation();
    const [time, setTime] = useState("");
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const chennaiTime = now.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
            });
            setTime(chennaiTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000 * 60);

        return () => clearInterval(interval);
    }, []);

    function sendMail(){
        console.log("SEND_MAIL")
    }

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
                    <div className="flex items-center w-full mt-10 gap-2" id="aboutMe">
                        <a href="#aboutMe" className="w-full font-medium text-4xl text-white">{t('portfolio.about.me')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.about.me.fun')}</p>
                    </div>
                    <p className="text-portfolio-500 text-lg italic">
                        {t('portfolio.about.me.desc.short')}
                    </p>
                    <p className="text-portfolio-500 text-base mt-5 font-normal">
                        {t('portfolio.about.me.desc.top')} {t('portfolio.about.me.desc.bottom')}
                    </p>

                    <div className="flex items-center w-full mt-10 gap-2" id="skillTree">
                        <a href="#skillTree" className="w-full font-medium text-4xl text-white">{t('portfolio.skills')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.skills.fun')}</p>
                    </div>


                    <div className="flex items-center w-full mt-10 gap-2" id="experience">
                        <a href="#experience" className="w-full font-medium text-4xl text-white">{t('portfolio.experience')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.experience.fun')}</p>
                    </div>
                    <div className="mt-5 border-l pl-5 border-portfolio-500">
                        <p className="text-portfolio-500"><i className="fa-solid fa-location-dot"></i> Chennai, India</p>
                        <div className="flex">
                            <p className="w-full text-white font-medium text-xl">Zoho Corporation</p>
                            <p className="w-full text-portfolio-500 font-medium text-end">Feb 2024 - PRESENT</p>
                        </div>
                        <p className="text-portfolio-500 text-lg">{t('portfolio.about.me.role')}</p>
                        <p className="text-portfolio-500 mt-3">
                            Contributing to the Active Directory Manager Plus (ADMP), working with Java, C++, and C# to develop scalable and reliable enterprise directory solutions.
                            Through this role, I have gained extensive experience in software architecture, system integrations, and collaborative team development, while enhancing my technical skills and understanding of complex enterprise workflows.
                        </p>
                    </div>
                    <div className="mt-10 border-l pl-5 border-portfolio-500">
                        <p className="text-portfolio-500"><i className="fa-solid fa-location-dot"></i> Coimbatore, India</p>
                        <div className="flex">
                            <p className="w-full text-white font-medium text-xl">Nandha Info Tech</p>
                            <p className="w-full text-portfolio-500 font-medium text-end">Mar - May 2024</p>
                        </div>
                        <p className="text-portfolio-500 text-lg">Internship</p>
                        <p className="text-portfolio-500 mt-3">
                            Worked on SenseLuto, an advanced soil intelligence solution, contributing to features like smart weather alerts, irrigation guidance, productivity analysis, and cloud data storage. Gained experience in software development, system design, and collaborative teamwork.
                        </p>
                    </div>

                    <div className="flex items-center w-full mt-10 gap-2" id="education">
                        <a href="#education" className="w-full font-medium text-4xl text-white">{t('portfolio.education')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.education.fun')}</p>
                    </div>
                    <div className="mt-5 border-l pl-5 border-portfolio-500">
                        <p className="text-white font-medium text-lg">Bachelor's Of Information Science & Engineering</p>
                        <p className="text-portfolio-500 font-medium">2020 - 2024</p>
                        <p className="text-portfolio-500">Bannari Amman Institute Of Technology</p>
                    </div>

                    <div className="flex items-center w-full mt-10 gap-2" id="contact">
                        <a href="#contact" className="w-full font-medium text-4xl text-white">{t('portfolio.contact')}</a>
                        <p className="w-full text-end text-portfolio-700 text-3xl font-medium">{t('portfolio.contact.fun')}</p>
                    </div>
                    <div className="mt-5 border-l pl-5 border-portfolio-500 flex">
                        <div className="w-full">
                            <div className="flex items-center gap-2">
                                <p className="text-portfolio-50 text-xl font-medium">Time:</p>
                                <p className="text-portfolio-500 text-xl font-medium">{time}</p>
                            </div>
                            <p className="text-portfolio-50 text-xl font-medium mt-5">Email:</p>
                            <a href="mailto:manojanguraja@gmail.com" className="mt-2 text-portfolio-500 font-medium hover:underline">manojanguraja@gmail.com</a>

                            <p className="text-portfolio-50 text-xl font-medium mt-5">Socials:</p>
                            <div className="w-full flex items-center gap-4 text-portfolio-500 text-2xl mt-2">
                                <a href="https://www.linkedin.com/in/manojbit/" target="_blank" className="hover:text-white">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/ManojTGN" target="_blank" className="hover:text-white">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                                <a href="https://steamcommunity.com/id/ManojTGN/" target="_blank" className="hover:text-white">
                                    <i className="fa-brands fa-steam"></i>
                                </a>
                                <a href="https://open.spotify.com/user/31coacig75i7cwnvsalo5yhlmhne" target="_blank" className="hover:text-white">
                                    <i className="fa-brands fa-spotify"></i>
                                </a>
                                <a href="https://www.instagram.com/_m4n0j_/" target="_blank" className="hover:text-white">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://www.paypal.com/paypalme/manojtgn" target="_blank" className="hover:text-white">
                                    <i className="fa-brands fa-paypal"></i>
                                </a>
                                <a href="mailto:manojanguraja@gmail.com" className="hover:text-white">
                                    <i className="fa-solid fa-at"></i>
                                </a>
                            </div>

                            <p className="mt-5 text-portfolio-50 font-medium text-xl">{t('portfolio.dont.be.shy')}</p>
                            <p className="text-portfolio-500 font-medium text-lg">{t('portfolio.just.say.hello')}</p>
                        </div>
                        <div className="w-full flex flex-col gap-5 text-portfolio-500">
                            <input className="border-2 border-portfolio-700 bg-portfolio-950 h-12 p-2" placeholder="Your Name"/>
                            <input  className="border-2 border-portfolio-700 bg-portfolio-950 h-12 p-2" placeholder="Your Email"/>
                            <textarea className="h-56 min-h-32 max-h-56 border-2 border-portfolio-700 bg-portfolio-950 p-2" placeholder="Your Message"></textarea>
                            <button onClick={sendMail} className="w-full font-medium text-start text-portfolio-950 border-portfolio-950 bg-portfolio-500 hover:border-white hover:text-white border-2 p-2">Send Message</button>
                        </div>
                    </div>

                    <hr className="w-full mt-5 border-portfolio-500" />
                    <div className="w-full text-portfolio-500 flex items-center gap-2">
                        <div className="w-full flex items-center gap-1">
                            <i className="fa-regular fa-copyright mt-1"></i> 
                            <p>copyright 2025</p>
                        </div>
                        <div className="w-full flex items-center justify-end gap-2">
                            <a href="/accessibility" className="underline hover:text-white">a11y</a>
                            <a href="https://github.com/ManojTGN/Portfolio/issues/new" target="_blank" className="underline hover:text-white">report</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
