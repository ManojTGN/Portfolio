'use client'

import { useTranslation } from "react-i18next";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function Work() {
    const {t, i18n, ready } = useTranslation();
    if (!ready) return <></>;

    return (
        <>
            <div className="w-full flex flex-col items-center justify-start">
                <div className="w-6/12 flex flex-col">
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500" />
                    <span className="text-xs text-center mt-20 p-1 text-portfolio-100 font-bold">No Works Right Now!</span>
                    <div className="mt-20"></div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
