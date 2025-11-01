import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import Image from 'next/image';

export default function Skills(){
    const {t, i18n, ready } = useTranslation();

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
                    <Image src="/images/Next.js.svg" alt="" width={30} height={30} draggable={false} />
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
                    <Image src="/images/gsap.png" alt="" width={30} height={30} draggable={false} /> 
                    Gsap (Basic)
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/tailwind.svg" alt="" width={30} height={30} draggable={false} /> 
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
                    <Image src="/images/C.svg" alt="" width={30} height={30} draggable={false} /> 
                    C
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/C++.svg" alt="" width={30} height={30} draggable={false} /> 
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
                    <Image src="/images/java.svg" alt="" width={30} height={30} draggable={false} />
                    Java
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/Python.svg" alt="" width={30} height={30} draggable={false} />
                    Python
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/Git.svg" alt="" width={30} height={30} draggable={false} />
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
                    <Image src="/images/MySQL.svg" alt="" width={30} height={30} draggable={false} /> 
                    MySQL
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/PostgresSQL.svg" alt="" width={30} height={30} draggable={false} /> 
                    PostgresSQL
                </p>
            </div>
        </div>

        <p className="text-xl text-portfolio-950 dark:text-white font-medium mt-5">{t('portfolio.skills.frontend.design.creative.tools')}</p>
        <div className="grid grid-cols-3 grid-rows-1">
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/AdobePhotoshop.svg" alt="" width={20} height={20} draggable={false} /> 
                    Adobe Photoshop
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/AdobePremierePro.svg" alt="" width={20} height={20} draggable={false} /> 
                    Adobe Premiere Pro
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/Figma.svg" alt="" width={20} height={20} draggable={false} /> 
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

    // const [languages, setLanguages] = useState({});
    // const [totalBytes, setTotalBytes] = useState(0);

    // useEffect(()=>{
    //     async function getSkills(){
    //         try {
    //             const res = await fetch("/api/getSkills", {method: "GET"});
    //             const data = await res.json();

    //             if (res.ok) {
    //                 setLanguages(data);

    //                 const total = Object.values(data).reduce((acc, val) => acc + val, 0);
    //                 setTotalBytes(total);
    //             } else {
    //                 console.error("Error:", data);
    //             }
    //         } catch (err) {
    //             console.error("Network Error:", err);
    //         }
    //     }
    //     getSkills();
    // },[])

    // return <>
    // <div className="grid grid-cols-3 grid-rows-1 gap-5">
    //     {Object.entries(languages).map(([lang, bytes]) => {
    //         const percent = totalBytes ? (bytes / totalBytes) * 100 : 0;
    //         return (
    //         <div key={lang} className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
    //             <p className="text-portfolio-500 font-bold text-xl">{lang}</p>
    //             <span className="text-portfolio-500 font-medium">{Math.round(percent)}%</span>
    //         </div>
    //         )
    //     })}
    // </div>
    // <div className="grid grid-cols-3 grid-rows-1 gap-5 mt-5">
    //     <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
    //         <p className="text-portfolio-500 font-medium text-xl">Adobe Photoshop</p>
    //     </div>
    //     <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
    //         <p className="text-portfolio-500 font-medium text-xl">Adobe Premiere Pro</p>
    //     </div>
    //     <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
    //         <p className="text-portfolio-500 font-medium text-xl">Figma</p>
    //     </div>
    //     <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
    //         <p className="text-portfolio-500 font-medium text-xl">Steam Game Guide</p>
    //     </div>
    //     <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
    //         <p className="text-portfolio-500 font-medium text-xl">Open Source Contrib</p>
    //     </div>
    // </div>
    // <div className="w-full mt-10">
    //     <p className="text-portfolio-500 font-medium text-base">
    //         {t('portfolio.skills.stats.info')} <a href="/work" className="underline text-portfolio-300 cursor-pointer">{t('portfolio.skills.stats.work.page')}</a>.
    //     </p>
    // </div>
    // </>
}