'use client'


import Button from './Button';
import Name from './Name';
import { useTranslation } from "react-i18next";

export default function Sidebar(){
    const {t, i18n } = useTranslation();

    return <>
        <div className="w-full h-16 flex items-center justify-center gap-2">
            <div className='w-[250px] flex items-center justify-start'>
                <Name /> 
            </div>
            <div className="w-full h-[2px] bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 rounded-md"></div>
            <div className='w-auto flex gap-5 justify-end'>
                <Button name={t("portfolio.topbar.about")} />
                <Button name={t("portfolio.topbar.work")} />
                <Button name={t("portfolio.topbar.contact")} />
            </div>
        </div>

        <div className="">
            {/* <Button name={t("portfolio.sidebar.customize")} iconClassName="text-4xl fa-solid fa-gear"/> */}
        </div>
    </>
}