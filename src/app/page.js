'use client'

import { useTranslation } from "react-i18next";

export default function Home() {
    const {t, i18n } = useTranslation();
    return (
        <>
            <div className="flex justify-center w-full h-full font-portfolio text-white p-2">
                <div className="w-1/6 text-end font-bold text-8xl"> 
                    {t("portfolio.top.realname")}
                </div>
                <div class="border rounded-md border-neutral-400 mx-4"></div>
                <div className="w-3/6">

                </div>
            </div>
        </>
    );
}
