'use client'

import { useTranslation } from "react-i18next";

export default function Experiences(){
    const {t, i18n, ready } = useTranslation();

    return <>
        <div className="mt-5 border-l pl-5 border-portfolio-500">
            <p className="text-portfolio-500"><i className="fa-solid fa-location-dot"></i> {t('portfolio.experience.zoho.location')}</p>
            <div className="flex">
                <p className="w-full text-white font-medium text-xl">{t('portfolio.experience.zoho.fullname')}</p>
                <p className="w-full text-portfolio-500 font-medium text-end">{t('portfolio.experience.zoho.duration')}</p>
            </div>
            <p className="text-portfolio-500 text-lg">{t('portfolio.experience.zoho.role')}</p>
            <p className="text-portfolio-500 mt-3">
                {t('portfolio.experience.zoho.desc')}
            </p>
        </div>
        <div className="mt-10 border-l pl-5 border-portfolio-500">
            <p className="text-portfolio-500"><i className="fa-solid fa-location-dot"></i> {t('portfolio.experience.nit.location')}</p>
            <div className="flex">
                <p className="w-full text-white font-medium text-xl">{t('portfolio.experience.nit.fullname')}</p>
                <p className="w-full text-portfolio-500 font-medium text-end">{t('portfolio.experience.nit.duration')}</p>
            </div>
            <p className="text-portfolio-500 text-lg">{t('portfolio.experience.nit.role')}</p>
            <p className="text-portfolio-500 mt-3">
                {t('portfolio.experience.nit.desc')}
            </p>
        </div>
    </>
}