import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { useTheme } from "next-themes";

export default function Skills() {
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
        <>
        <p className="text-xl text-portfolio-950 dark:text-white font-medium mt-5">{t('portfolio.skills.frontend.development')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-5 md:gap-0">
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-js text-yellow-500"></i> {t('portfolio.skills.js')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Next.js.svg" alt="" width={30} height={30} draggable={false} className={theme === 'dark' ? "invert" : ""} />
                    {t('portfolio.skills.nextjs')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-react text-blue-500"></i> {t('portfolio.skills.react')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/gsap.png" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.gsap')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/tailwind.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.tailwind')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-bootstrap text-pink-500"></i> {t('portfolio.skills.bootstrap')}
                </p>
            </div>
        </div>

        <p className="text-xl text-portfolio-950 dark:text-white font-medium mt-5">{t('portfolio.skills.backend.systems')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-5 md:gap-0">
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/C.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.c')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/C++.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.cpp')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-node-js text-lime-500"></i> {t('portfolio.skills.nodejs')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/java.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.java')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Python.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.python')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Git.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.git')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-docker text-blue-500"></i> {t('portfolio.skills.docker')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/MySQL.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.mysql')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/PostgresSQL.svg" alt="" width={30} height={30} draggable={false} />
                    {t('portfolio.skills.postgres')}
                </p>
            </div>
        </div>

        <p className="text-xl text-portfolio-950 dark:text-white font-medium mt-5">{t('portfolio.skills.frontend.design.creative.tools')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-5 md:gap-0">
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/AdobePhotoshop.svg" alt="" width={20} height={20} draggable={false} />
                    {t('portfolio.skills.photoshop')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/AdobePremierePro.svg" alt="" width={20} height={20} draggable={false} />
                    {t('portfolio.skills.premiere')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl flex gap-1">
                    <Image src="/images/work/brand/Figma.svg" alt="" width={20} height={20} draggable={false} />
                    {t('portfolio.skills.figma')}
                </p>
            </div>
            <div className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5">
                <p className="text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                    <i className="fa-brands fa-square-steam text-blue-900"></i> {t('portfolio.skills.steamguide')}
                </p>
            </div>
        </div>
        </>
    );
}