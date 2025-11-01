import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Topbar(){
    const {t, i18n, ready } = useTranslation();
    const [pathName, setPathName] = useState("");

    useEffect(() => {
        setPathName(window.location.pathname);
    }, []);
    
    return <>
        <div className="w-full flex items-center justify-end gap-5 pt-2">
            <a href="/" className={"dark:hover:text-portfolio-50 hover:underline p-1" + (pathName==='/'?" text-portfolio-950 dark:text-white font-medium underline cursor-default":" dark:text-portfolio-500 cursor-pointer")}>{t('portfolio.topbar.home')}</a>
            <a href="/work" className={"dark:hover:text-portfolio-50 hover:underline p-1" + (pathName==='/work'?" text-portfolio-950 dark:text-white font-medium underline cursor-default":" dark:text-portfolio-500 cursor-pointer")}>{t('portfolio.topbar.work')}</a>
            <a href="/#contact" className={"text-portfolio-950 dark:text-portfolio-500 dark:hover:text-portfolio-50 hover:underline p-1"}>{t('portfolio.topbar.contact')}</a>
            <div className="w-[1px] border-2 rounded-full dark:border-portfolio-500"></div>
            <a href="/blogs" className={"dark:hover:text-portfolio-50 hover:underline p-1" + (pathName==='/blogs'?" text-portfolio-950 dark:text-white font-medium underline cursor-default":" dark:text-portfolio-500 cursor-pointer")}>{t('portfolio.topbar.blogs')}</a>
        </div>
    </>
}