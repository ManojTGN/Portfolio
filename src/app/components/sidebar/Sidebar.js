'use client'

import Button from './Button';
import Name from './Name';
import { useTranslation } from "react-i18next";

export default function Sidebar(){
    const {t, i18n } = useTranslation();

    return <>
        <div className="top  h-1/6">
            <Name />
        </div>
        
        <div className="middle  h-full w-full flex flex-col gap-5 justify-center ">
            <Button name={t("portfolio.sidebar.about")} iconClassName="text-4xl text-purple-700 fa-solid fa-user"/>
            <Button name={t("portfolio.sidebar.projects")} iconClassName="text-4xl text-yellow-600 fa-solid fa-tarp"/>
            <Button name={t("portfolio.sidebar.contact")} iconClassName="text-4xl text-blue-400 fa-solid fa-id-badge"/>
        </div>

        <div className="bottom  flex items-center gap-2 w-full h-1/6">
            <Button name={t("portfolio.sidebar.customize")} iconClassName="text-4xl fa-solid fa-gear"/>
        </div>
    </>
}