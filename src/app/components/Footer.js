'use client'

import { useTranslation } from "react-i18next";
import { useTheme } from 'next-themes';


export default function Footer(){
    const {t, i18n, ready } = useTranslation();
    if(!ready) <></>;

    const languageName = new Intl.DisplayNames(["en"], { type: "language" }).of(i18n.language);

    const { theme, setTheme } = useTheme();
    function toggleTheme() {
        if(theme === 'dark') setTheme('light');
        else setTheme('dark');
    }

    return <>
    <footer>
        <hr className="w-full mt-5 border-portfolio-500 dark:border-portfolio-500" />
        <div className="w-full text-portfolio-900 dark:text-portfolio-500 flex items-center gap-2">
            <div className="w-full flex items-center gap-1">
                <i className="fa-regular fa-copyright mt-1"></i> 
                <p>{t('portfolio.footer.copyrights.2025')}</p>
            </div>
            <div className="w-full flex items-center justify-end gap-2">
                <button onClick={toggleTheme}><i className={`fa-solid fa-circle-half-stroke ${theme==='dark'?'fa-flip-horizontal':''}`}></i></button>
                <a href="/accessibility#language" className="underline hover:text-portfolio-950 hover:text-white"> {languageName}</a>
                <a href="/accessibility" className="underline hover:text-portfolio-950 dark:hover:text-white">{t('portfolio.footer.a11y')}</a>
                <a href="https://github.com/ManojTGN/Portfolio/issues/new" target="_blank" className="underline hover:text-portfolio-950 hover:text-white">{t('portfolio.footer.report')}</a>
            </div>
        </div>
    </footer>
    </>
}