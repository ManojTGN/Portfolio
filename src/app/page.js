'use client'

import { useTranslation } from "react-i18next";
import TopBar from "./components/TopBar/TopBar";
import Paint from "./components/Paint";
import Image from "next/image";

export default function Home() {
    const {t, i18n } = useTranslation();
    return (
        <>
            <div className="w-full h-full flex flex-col items-center font-portfolio dark:text-white text-black p-2">
                <div className="w-[1200px] flex flex-col items-center">
                    <TopBar />
                    <div className="w-full flex flex-col h-[675px] mt-10 bg-neutral-900 relative">
                        <Paint />
                        <div className="h-full">

                        </div>
                        <div className="h-full flex flex-col items-end justify-end p-10 gap-2">
                            <p className="text-end text-6xl font-bold"> {t('portfolio.about.me')}</p>
                            <p className="text-end text-3xl text-neutral-600 font-medium w-3/4"> {t('portfolio.about.me.desc')}</p>
                        </div>
                    </div>
                    <hr className="border w-full " />

                    <div className="mt-36 w-full" >
                        <p className="text-start text-5xl font-[600] pb-5">
                            {t('portfolio.about.my.secret.sauce')}
                        </p>
                        <div className="grid grid-cols-4 grid-rows-9 gap-2 h-[1200px]">
                            <div className="col-span-2 row-span-5 bg-neutral-900 relative border border-transparent hover:border-white transition-all group">
                                <div className="absolute w-full">
                                    <p className="text-8xl font-bold text-neutral-800 text-end p-5 select-none">01</p>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-5">
                                        <div className="relative inline-block">
                                            <Image src={`/images/blue_badge.png`} alt="" width={100} height={100} className="object-cover select-none border-0 outline-none ring-0 bg-transparent group-hover:animate-spin-slow" draggable="false" />
                                            <i className="fa-solid fa-code-commit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl z-10"></i>
                                        </div>
                                        <div>
                                            <p className="text-6xl font-bold text-neutral-50">Software</p>
                                            <p className="text-xl font-bold text-neutral-500">Development</p>
                                        </div>
                                    </div>

                                    <hr className="mt-5"/>
                                    <p className="text-2xl font-bold text-neutral-500 mt-5"> SKILLS ▪ SAUCE </p>
                                </div>
                            </div>

                            <div className="col-span-2 row-span-5 col-start-3 bg-neutral-900 relative border border-transparent hover:border-white transition-all group">
                                <div className="absolute w-full">
                                    <p className="text-8xl font-bold text-neutral-800 text-end p-5 select-none">02</p>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-5">
                                        <div className="relative inline-block">
                                            <Image src={`/images/purple_badge.png`} alt="" width={100} height={100} className="object-cover select-none border-0 outline-none ring-0 bg-transparent group-hover:animate-spin-slow" draggable="false" />
                                            <i className="fa-solid fa-globe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl z-10"></i>
                                        </div>
                                        <div>
                                            <p className="text-6xl font-bold text-neutral-50">Web</p>
                                            <p className="text-xl font-bold text-neutral-500">Development</p>
                                        </div>
                                    </div>
                                    <hr className="mt-5"/>
                                    <p className="text-2xl font-bold text-neutral-500 mt-5"> SKILLS ▪ SAUCE </p>
                                </div>
                            </div>

                            <div className="col-span-4 row-span-4 row-start-6 bg-neutral-900 relative border border-transparent hover:border-white transition-all group">
                                <div className="absolute w-full">
                                    <p className="text-8xl font-bold text-neutral-800 text-end p-5 select-none">03</p>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-5">
                                        <div className="relative inline-block">
                                            <Image src={`/images/green_badge.png`} alt="" width={100} height={100} className="object-cover select-none border-0 outline-none ring-0 bg-transparent group-hover:animate-spin-slow" draggable="false" />
                                            <i className="fa-solid fa-heart absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl z-10"></i>
                                        </div>
                                        <div className="">
                                            <p className="text-6xl font-bold text-neutral-50">Playground</p>
                                            <p className="text-xl font-bold text-neutral-500">Others</p>
                                        </div>
                                    </div>
                                    <hr className="mt-5"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border w-full " />

                    <div className="mt-36 w-full">
                        <p className="text-start text-6xl font-[600] pb-5">
                            {t('portfolio.about.my.journey')}
                        </p>
                        <div className="w-full h-[700px] bg-neutral-900 flex items-end justify-center">
                                <ol className="relative border-s w-4/6 border-gray-700">
                                    <li className="mb-10 ms-6"> 
                                        <div className="absolute left-0 -translate-x-1/2">
                                            <Image src={`/images/blue_badge.png`} className="animate-spin-slow" alt="" width={34} height={34} />
                                            <i className="fa-solid fa-briefcase text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                                        </div>
                                        <h3 className="flex items-center mb-1 text-3xl font-semibold text-white">
                                            Zoho Corporation
                                            <span className="text-sm font-medium me-2 px-2.5 py-0.5 bg-blue-900 text-blue-300 ms-3">Current</span>
                                        </h3>
                                        <time className="block mb-2 text-sm font-normal leading-none text-gray-500">Feb, 2024 - Present</time>
                                        <p className="mb-4 text-base font-normal text-gray-400 ">
                                            Working in the Active Directory Manager Plus (ADMP) Team, developing and enhancing features for Active Directory Manager Plus. Focus on implementing scalable backend modules and optimizing system integrations to improve performance and reliability.
                                        </p>
                                    </li>

                                    <li className="mb-10 ms-6">
                                        <div className="absolute left-0 -translate-x-1/2">
                                            <Image src={`/images/blue_badge.png`} className="animate-spin-slow" alt="" width={24} height={24} />
                                            <i className="fa-solid fa-scroll text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-x-[-1]"></i>
                                        </div>
                                        <h3 className="mb-1 text-lg font-semibold text-white">Nandha InfoTech Internship</h3>
                                        <time className="block mb-2 text-sm font-normal leading-none text-gray-500">Mar, 2023 - May, 2023 (3rd Year Intern)</time>
                                        <p className="text-base font-normal text-gray-400">
                                            Worked on Senseluto, an IoT-based smart agriculture product that collects soil data through sensors and sends it to the cloud for analysis. Contributed to data processing and visualization to help improve soil quality and optimize crop growth.
                                        </p>
                                    </li>
                                    <li className="mb-10 flex items-center gap-2">
                                        <hr className="border border-dashed w-full border-neutral-600" />
                                        <p className="text-lg text-neutral-600">Education</p>
                                        <hr className="border border-dashed w-full border-neutral-600" />
                                    </li>
                                    <li className="mb-24 ms-6">
                                        <div className="absolute left-0 -translate-x-1/2">
                                            <Image src={`/images/blue_badge.png`} className="animate-spin-slow" alt="" width={24} height={24} />
                                            <i className="fa-solid fa-graduation-cap text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                                        </div>
                                        <h3 className="mb-1 text-lg font-semibold text-white">Bannari Amman Institute Of Technology</h3>
                                        <time className="block mb-2 text-sm font-normal leading-none text-gray-500">Information Sciene & Engineering ▪ <span className="font-medium">2020-24</span></time>
                                        <p className="text-base font-normal text-gray-400">Gained a strong foundation in computer science, data management, software engineering, and networking, with hands-on experience in building efficient and scalable systems.</p>
                                    </li>
                                </ol>
                        </div>
                    </div>
                    <hr className="border w-full " />

                    <div className="mt-36 w-full">
                        <p className="text-start text-4xl font-[600] pb-5">
                            {t('portfolio.topbar.contact')}
                        </p>
                        <div className="flex flex-row w-full h-[350px] gap-3">
                            <div className="w-3/12 h-full bg-neutral-900">
                                <div className="h-full w-full flex flex-col items-end justify-end p-4">
                                    <p className="text-neutral-600 text-xl font-bold">Don&apos;t Be Shy</p>
                                    <p className="text-6xl font-bold">Say Hello</p>
                                </div>
                                <hr className="border w-full" />
                            </div>  
                            <div className="w-9/12 h-full bg-neutral-900">
                                <div className="h-full w-full flex flex-col justify-center items-center">
                                    <div className="h-full w-3/4 flex items-end justify-center gap-10 text-5xl">
                                        <a href="https://www.linkedin.com/in/manojbit/" target="_blank">
                                            <i className="fa-brands fa-linkedin"></i>
                                        </a>
                                        <a href="https://github.com/ManojTGN" target="_blank">
                                            <i className="fa-brands fa-github"></i>
                                        </a>
                                        <a href="https://steamcommunity.com/id/ManojTGN/" target="_blank">
                                            <i className="fa-brands fa-steam"></i>
                                        </a>
                                        <a href="https://open.spotify.com/user/31coacig75i7cwnvsalo5yhlmhne" target="_blank">
                                            <i className="fa-brands fa-spotify"></i>
                                        </a>
                                        <a href="https://www.instagram.com/_m4n0j_/" target="_blank">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                        <a href="https://www.paypal.com/paypalme/manojtgn" target="_blank">
                                            <i className="fa-brands fa-paypal"></i>
                                        </a>
                                        <a href="mailto:manojanguraja@gmail.com">
                                            <i className="fa-solid fa-at"></i>
                                        </a>
                                    </div>
                                    <div className="w-3/4 h-full flex items-start justify-center gap-5 p-5">
                                        <input className="w-full h-[50px] border-2 border-neutral-700 bg-neutral-950 px-3" placeholder="Give me your email !" />
                                        <button className="h-[50px] bg-neutral-950 text-center font-bold px-7 border-2 border-neutral-700">Send</button>
                                    </div>
                                </div>
                                <hr className="border w-full" />
                            </div>
                        </div>
                    </div>

                    <footer className="mt-16 text-end w-full flex items-center justify-start">
                        <div className="w-full flex items-start gap-2">
                            <a className="underline text-neutral-400" href="https://github.com/ManojTGN/Portfolio/issues/new" target="_blank">Report An Issue</a>
                            <a className="underline text-neutral-400" href="../accessibility" >A11Y</a>
                        </div>
                        <div className="w-full text-end text-neutral-400">
                            <i className="fa-solid fa-copyright"></i> 2025. Manoj A. <i className="fa-solid fa-registered"></i> All Rights Reserved.
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
