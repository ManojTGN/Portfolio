import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { useTheme } from "next-themes";

export default function Skills(){
    const {t, i18n, ready } = useTranslation();
    const {theme, setTheme} = useTheme();


    return <>
        <p className="text-xl text-portfolio-950 dark:text-white font-medium mt-5">{t('portfolio.skills.frontend.development')}</p>
        <div className="grid grid-cols-3 grid-rows-1">
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-js text-yellow-500"></i> Vanila JavaScript
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Next.js.svg" alt="" width={30} height={30} draggable={false} className={theme==='dark'?"invert":""} />
                    NextJs
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-react text-blue-500"></i> React
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/gsap.png" alt="" width={30} height={30} draggable={false} /> 
                    Gsap (Basic)
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/tailwind.svg" alt="" width={30} height={30} draggable={false} /> 
                    Tailwind Css
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-bootstrap text-pink-500"></i> Bootstrap
                </p>
            </div>
        </div>

        <p className="text-xl text-portfolio-950 dark:text-white font-medium mt-5">{t('portfolio.skills.backend.systems')}</p>
        <div className="grid grid-cols-3 grid-rows-1">
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/C.svg" alt="" width={30} height={30} draggable={false} /> 
                    C
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/C++.svg" alt="" width={30} height={30} draggable={false} /> 
                    C++
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-node-js text-lime-500"></i> Node JS
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/java.svg" alt="" width={30} height={30} draggable={false} />
                    Java
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Python.svg" alt="" width={30} height={30} draggable={false} />
                    Python
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Git.svg" alt="" width={30} height={30} draggable={false} />
                    Git
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-docker text-blue-500"></i> Docker
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/MySQL.svg" alt="" width={30} height={30} draggable={false} /> 
                    MySQL
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/PostgresSQL.svg" alt="" width={30} height={30} draggable={false} /> 
                    PostgresSQL
                </p>
            </div>
        </div>

        <p className="text-xl text-portfolio-950 dark:text-white font-medium mt-5">{t('portfolio.skills.frontend.design.creative.tools')}</p>
        <div className="grid grid-cols-3 grid-rows-1">
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/AdobePhotoshop.svg" alt="" width={20} height={20} draggable={false} /> 
                    Adobe Photoshop
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/AdobePremierePro.svg" alt="" width={20} height={20} draggable={false} /> 
                    Adobe Premiere Pro
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Figma.svg" alt="" width={20} height={20} draggable={false} /> 
                    Figma
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-square-steam text-blue-900"></i> Steam Guide
                </p>
            </div>
        </div>
    </>
}