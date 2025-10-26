'use client'

import { useTranslation } from "react-i18next";

export default function Footer(){
    const {t, i18n, ready } = useTranslation();
    if (!ready) return <></>;

    return <>
    <footer>
        <hr className="w-full mt-5 border-portfolio-500" />
        <div className="w-full text-portfolio-500 flex items-center gap-2">
            <div className="w-full flex items-center gap-1">
                <i className="fa-regular fa-copyright mt-1"></i> 
                <p>{t('portfolio.footer.copyrights.2025')}</p>
            </div>
            <div className="w-full flex items-center justify-end gap-2">
                <a href="/accessibility" className="underline hover:text-white">{t('portfolio.footer.a11y')}</a>
                <a href="https://github.com/ManojTGN/Portfolio/issues/new" target="_blank" className="underline hover:text-white">{t('portfolio.footer.report')}</a>
            </div>
        </div>
    </footer>
    </>
}