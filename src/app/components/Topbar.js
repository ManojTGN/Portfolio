import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Topbar(){
    const {t, i18n, ready } = useTranslation();
    const [pathName, setPathName] = useState("");
    if (!ready) return <></>;

    useEffect(() => {
        setPathName(window.location.pathname);
    }, []);
    
    return <>
        <div className="w-full flex items-center justify-end gap-5 pt-2">
            <a href="/" className={"text-portfolio-500 hover:text-portfolio-50 hover:underline p-1 " + (pathName==='/'?" text-white font-medium underline cursor-default":" cursor-pointer")}>{t('portfolio.topbar.home')}</a>
            <a href="/work" className={"text-portfolio-500 hover:text-portfolio-50 hover:underline p-1" + (pathName==='/work'?" text-white font-medium underline cursor-default":" cursor-pointer")}>{t('portfolio.topbar.work')}</a>
            <a href="/#contact" className={"text-portfolio-500 hover:text-portfolio-50 hover:underline p-1"}>{t('portfolio.topbar.contact')}</a>
        </div>
    </>
}