'use client'

import { useTranslation } from "react-i18next";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function Blogs() {
    const {t, i18n, ready } = useTranslation();
    if (!ready) return <></>;

    return (
        <>
            <div className="w-full flex flex-col items-center justify-start">
                <div className="w-6/12 flex flex-col">
                    <span className="text-xs px-2 bg-yellow-700 text-black font-bold">In Development</span>
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500" />
                    <div className="mt-20"></div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
