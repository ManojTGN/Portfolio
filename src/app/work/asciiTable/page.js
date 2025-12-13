'use client'

import Topbar from "@/app/components/Topbar";
import '../../i18n';
import { useTranslation } from "react-i18next";

export default function AsciiTable() {
    const { t, i18n, ready } = useTranslation();
    if (!ready) return <></>;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="font-semibold text-5xl text-portfolio-500">{window.location.pathname.split('/').at(-1).charAt(0).toUpperCase() + window.location.pathname.split('/').at(-1).slice(1)}</p>
            <p className="text-portfolio-950 dark:text-portfolio-500 font-medium mt-5"><span className="text-red-600">*</span>Detailed Information For This Current Project Is In Development</p>
            <hr className="w-1/2 mt-2 border-portfolio-500" />
            <div>
                <Topbar />
            </div>
        </div>
    );
}
