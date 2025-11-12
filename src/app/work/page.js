'use client'

import { useTranslation } from "react-i18next";
import { useState } from "react";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

export default function Work() {
    const {t, i18n, ready } = useTranslation();
    const [view, setView] = useState(`LARGE`);
    
    
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

                    {/* <a href="#featured" className="text-5xl font-medium" id="featured">Featured</a>
                    <div className="w-full">
                    </div> */}

                    <a href="#product" className="text-5xl font-medium" id="product">Product</a>
                    <div className="aspect-video border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500">
                        <Carousel showArrow={true} images={["/images/GrievanceForum1.jpg","/images/GrievanceForum2.jpg","/images/GrievanceForum3.jpg","/images/GrievanceForum4.jpg","/images/GrievanceForum5.jpg","/images/GrievanceForum6.jpg"]} />
                    </div>
                    <a href="/work/grievanceForum">
                    <div className="border-l-2 pl-5 pt-2 border-portfolio-500 dark:border-portfolio-500">
                        <p className="text-4xl font-medium">GrievanceForum</p>
                        <p className="text-portfolio-500">BIT Grievance Forum is an online platform available to the College Students to lodge their grievances to the college authorities on any subject related to service delivery. It is a single portal connected to all the BIT institute. The BIT Grievance Forum is also accessible to the student through standalone mobile application.</p>
                    </div>
                    </a>

                    <a href="#package" className="text-5xl font-medium mt-16" id="package">Package & Project</a>
                    <div className="w-full">

                    </div>

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
