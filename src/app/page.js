'use client'

import { useTranslation } from "react-i18next";
import Sidebar from "./components/sidebar/Sidebar";

export default function Home() {
    const {t, i18n } = useTranslation();
    return (
        <>
            <div className="flex justify-center w-full h-full font-portfolio dark:text-white text-black p-2 overflow-hidden">
                <div className="sidebar  w-1/6 flex flex-col items-center">
                    <Sidebar />
                </div>
                <div className="border rounded-md dark:border-neutral-400 border-neutral-900 mx-4"></div>
                <div className="w-3/6">

                </div>
            </div>
        </>
    );
}
