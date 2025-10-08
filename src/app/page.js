'use client'

import { useTranslation } from "react-i18next";
import TopBar from "./components/TopBar/TopBar";

export default function Home() {
    const {t, i18n } = useTranslation();
    return (
        <>
            <div className="w-full h-full flex flex-col items-center font-portfolio dark:text-white text-black p-2 overflow-hidden">
                <div className="w-5/6 flex flex-col items-center">
                    <TopBar />
                    <div className="w-full flex flex-col rounded-3xl h-[500px] mt-20">
                        <div className="h-full">

                        </div>
                        <div className="h-full flex flex-col justify-end p-5 gap-2">
                            <p className="text-end text-5xl font-bold"> {t('portfolio.about.me')}</p>
                            <p className="text-end text-neutral-600 font-bold"> {t('portfolio.about.me.desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
