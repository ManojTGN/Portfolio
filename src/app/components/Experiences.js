'use client'

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Experiences() {
    const { t } = useTranslation();

    return (
        <>
        <div className="mt-5 border-l pl-5 border-portfolio-500">
            <div className="flex gap-4 items-start">
                <Image
                    src="/images/work/brand/zoho.png"
                    alt={t('portfolio.experience.zoho.fullname')}
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain shrink-0 mt-1"
                    draggable="false"
                />
                <div className="flex-1 min-w-0">
                    <p className="text-portfolio-500 dark:text-portfolio-500">
                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {t('portfolio.experience.zoho.location')}
                    </p>
                    <div className="flex flex-col sm:flex-row">
                        <h3 className="w-full dark:text-white font-medium text-xl">{t('portfolio.experience.zoho.fullname')}</h3>
                        <p className="w-full text-portfolio-500 dark:text-portfolio-500 font-medium text-end">{t('portfolio.experience.zoho.duration')}</p>
                    </div>
                    <p className="text-portfolio-500 dark:text-portfolio-500 text-lg">
                        {t('portfolio.experience.zoho.role')}
                    </p>
                </div>
            </div>
            <p className="text-portfolio-500 dark:text-portfolio-500 mt-3">
                {t('portfolio.experience.zoho.desc')}
            </p>
        </div>
        <div className="mt-10 border-l pl-5 border-portfolio-500">
            <div className="flex gap-4 items-start">
                <Image
                    src="/images/work/brand/nandhainfotech.png"
                    alt={t('portfolio.experience.nit.fullname')}
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain shrink-0 mt-1"
                    draggable="false"
                />
                <div className="flex-1 min-w-0">
                    <p className="text-portfolio-500 dark:text-portfolio-500">
                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {t('portfolio.experience.nit.location')}
                    </p>
                    <div className="flex flex-col sm:flex-row">
                        <h3 className="w-full dark:text-white font-medium text-xl">{t('portfolio.experience.nit.fullname')}</h3>
                        <p className="w-full text-portfolio-500 dark:text-portfolio-500 font-medium text-end">{t('portfolio.experience.nit.duration')}</p>
                    </div>
                    <p className="text-portfolio-500 dark:text-portfolio-500 text-lg">
                        {t('portfolio.experience.nit.role')}
                    </p>
                </div>
            </div>
            <p className="text-portfolio-500 dark:text-portfolio-500 mt-3">
                {t('portfolio.experience.nit.desc')}
            </p>
        </div>
    </>
    );
}