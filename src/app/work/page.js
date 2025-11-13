'use client'

import { useTranslation } from "react-i18next";
import { useState } from "react";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Image from "next/image";

export default function Work() {
    const {t, i18n, ready } = useTranslation();
    const [view, setView] = useState(`MEDIUM`);
    
    
    if (!ready) return <></>;
    return (
        <>
            <div className="w-full flex flex-col items-center justify-start">
                <div className="w-6/12 flex flex-col">
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500" />

                    <div className="relative w-full flex items-center justify-end mt-12 z-10">
                        <div className="h-12 text-2xl text-portfolio-500 flex items-center justify-end gap-5 fixed bg-portfolio-950 px-5 rounded-lg">
                            <i tabIndex={0} className={`fa-solid fa-table-cells ${view==='LARGE'?'text-portfolio-50':'cursor-pointer'}`} onClick={()=>setView('LARGE')}></i>
                            <i tabIndex={0} className={`fa-solid fa-grip-vertical ${view==='MEDIUM'?'text-portfolio-50':'cursor-pointer'}`} onClick={()=>setView('MEDIUM')}></i>
                            <i tabIndex={0} className={`fa-solid fa-bars ${view==='COMPACT'?'text-portfolio-50':'cursor-pointer'}`} onClick={()=>setView('COMPACT')}></i>
                        </div>
                    </div>


                    <a href="#product" className="text-5xl font-medium" id="product">Project & Package</a>
                    {view === "LARGE"?
                        <>
                        <a href="/work/grievanceForum">
                            <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500">
                                <Image src={"/images/GrievanceForum.png"} alt={""} draggable="false" width={"1080"} height={"200"}/>
                                <p className="text-portfolio-500 text-lg">A digital platform built to streamline how students and faculty raise, track, and resolve grievances within our college. It bridges communication gaps, ensures transparency, and empowers both students and administrators to act efficiently.</p>
                            </div>
                        </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={true} images={["/images/GrievanceForum1.jpg","/images/GrievanceForum2.jpg","/images/GrievanceForum3.jpg","/images/GrievanceForum4.jpg","/images/GrievanceForum5.jpg","/images/GrievanceForum6.jpg"]} />
                            </div>
                        <a href="/work/grievanceForum">
                            <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <p className="text-portfolio-500 text-lg">Grievance Forum is a web-based system that allows students to submit issues and suggestions, while admins can review, categorize, and resolve them with proper tracking. This project was developed as part of our college initiative to promote a transparent and responsive grievance-handling system.</p>
                                <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                    <span className="text-portfolio-50 font-medium">Tags:</span>
                                    <span>Web Product</span>
                                    <span>Mobile Compatibility</span>
                                    <span>NodeJS</span>
                                    <span>ExpressJS</span>
                                </div>
                            </div>
                        </a>
                        </>
                    :view === "MEDIUM"?
                        <>
                        <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500 flex gap-5">
                            <div className="w-full aspect-video">
                            <Carousel showArrow={true} images={["/images/GrievanceForum1.jpg","/images/GrievanceForum2.jpg","/images/GrievanceForum3.jpg","/images/GrievanceForum4.jpg","/images/GrievanceForum5.jpg","/images/GrievanceForum6.jpg"]} />
                            </div>
                            <div className="w-full">
                            <a href="/work/grievanceForum">
                                <Image src={"/images/GrievanceForum.png"} alt={""} draggable="false" width={"1080"} height={"200"}/>
                                <p className="text-portfolio-500 text-lg">A digital platform built to streamline how students and faculty raise, track, and resolve grievances within our college. It bridges communication gaps, ensures transparency, and empowers both students and administrators to act efficiently.</p>

                                <p className="text-portfolio-500 text-lg">Grievance Forum is a web-based system that allows students to submit issues and suggestions, while admins can review, categorize, and resolve them with proper tracking. This project was developed as part of our college initiative to promote a transparent and responsive grievance-handling system.</p>
                                <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                    <span className="text-portfolio-50 font-medium">Tags:</span>
                                    <span>Web Product</span>
                                    <span>Mobile Compatibility</span>
                                    <span>NodeJS</span>
                                    <span>ExpressJS</span>
                                </div>
                            </a>
                            </div>
                        </div>
                        </>
                    :   
                        <>
                        <a href="/work/grievanceForum">
                            <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500">
                                <Image src={"/images/GrievanceForum.png"} alt={""} draggable="false" width={"600"} height={"200"}/>
                                <p className="text-portfolio-500 text-lg">A digital platform built to streamline how students and faculty raise, track, and resolve grievances within our college. It bridges communication gaps, ensures transparency, and empowers both students and administrators to act efficiently.</p>
                            </div>
                        </a>
                        </>
                    }

                    {view === "LARGE"?
                        <>
                        <a href="/work/cGrafix">
                            <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                <Image src={"/images/cGrafix.png"} alt={""} draggable="false" width={"1080"} height={"200"}/>
                                <p className="text-portfolio-500 text-lg">Cgrafix is a lightweight C graphics library that works only on Windows. It uses the native Windows API to render shapes, text, and visuals directly on the screen. No extra dependencies needed.</p>
                            </div>
                        </a>
                        <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                            <Carousel showArrow={true} images={["/images/cGrafix1.jpg","/images/cGrafix2.jpg","/images/cGrafix3.jpg"]} />
                        </div>
                        <a href="/work/cGrafix">
                            <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                    <span className="text-portfolio-50 font-medium">Tags:</span>
                                    <span>Library</span>
                                    <span>Pure C Programming</span>
                                </div>
                            </div>
                        </a>
                        </>
                    :view === "MEDIUM"?
                        <>
                        <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex gap-5">
                            <div className="w-full aspect-video">
                            <Carousel showArrow={true} images={["/images/cGrafix1.jpg","/images/cGrafix2.jpg","/images/cGrafix3.jpg"]} />
                            </div>
                            <div className="w-full">
                            <a href="/work/cGrafix">
                                <Image src={"/images/cGrafix.png"} alt={""} draggable="false" width={"1080"} height={"200"}/>
                                <p className="text-portfolio-500 text-lg">Cgrafix is a lightweight C graphics library that works only on Windows. It uses the native Windows API to render shapes, text, and visuals directly on the screen. No extra dependencies needed.</p>
                                <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                    <span className="text-portfolio-50 font-medium">Tags:</span>
                                    <span>Library</span>
                                    <span>Pure C Programming</span>
                                </div>
                            </a>
                            </div>
                        </div>
                        </>
                    :
                        <>
                        <a href="/work/cGrafix">
                            <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                <Image src={"/images/cGrafix.png"} alt={""} draggable="false" width={"600"} height={"200"}/>
                                <p className="text-portfolio-500 text-lg">Cgrafix is a lightweight C graphics library that works only on Windows. It uses the native Windows API to render shapes, text, and visuals directly on the screen. No extra dependencies needed.</p>
                            </div>
                        </a>
                        </>
                    }

                    {view === "LARGE"?
                        <></>
                    :view === "MEDIUM"?
                        <></>
                    :
                        <>
                        <a href="/work/asciiCam">
                            <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                <Image src={"/images/asciicam.png"} alt={""} draggable="false" width={"600"} height={"200"}/>
                                <p className="text-portfolio-500 text-lg">This C++ program captures frames from your webcam and converts them into ASCII art in real-time. and it will produce the output ascii art in the terminal. You can customize the output, change cameras, add your own ASCII characters, and more.</p>
                            </div>
                        </a>
                        </>
                    }

                    <a href="#creativeWorks" className="text-5xl font-medium mt-16" id="creativeWorks">Creative Works</a>
                    <div className="w-full">

                    </div>

                    <a href="#contentCreator" className="text-5xl font-medium mt-16" id="contentCreator">Content Creator</a>
                    <div className="w-full">

                    </div>

                    <div className="mt-16 pl-5 border-dashed border-l-2 border-portfolio-500 dark:border-portfolio-500">
                        <p className="dark:text-white font-medium text-lg">Help Me Fill Up This Page! </p>
                        <p className="text-portfolio-500 dark:text-portfolio-500">This page is still growing. Got an idea, a spark, or a challenge? Lets build something that deserves a spot here. ⚡</p>
                        <p className="text-portfolio-500 dark:text-portfolio-500">The next big thing starts with a message  <a className="underline text-yellow-700 font-semibold" href="/#contact">Come Say Hi.</a></p>
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    );
}
