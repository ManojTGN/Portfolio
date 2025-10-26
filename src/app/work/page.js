'use client'

import { useTranslation } from "react-i18next";
import Topbar from "../components/Topbar";

export default function Home() {
    const {t, i18n } = useTranslation();
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-6/12 flex flex-col justify-center">
                    <Topbar />
                    <div className="w-full flex items-center justify-center mt-10">
                        <p className="text-white font-medium"><span className="text-yellow-500">@todo:</span> work page</p>
                    </div>
                </div>
            </div>
        </>
    );
}
