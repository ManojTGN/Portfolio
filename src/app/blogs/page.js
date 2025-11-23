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
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500"/>
                    <marquee className="mt-20 bg-yellow-300">
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                        <span className="text-xs text-yellow-700 font-bold">Blogs Coming Soon! </span>
                        <span className="text-xs text-black font-bold">No Blogs Right Now! </span>
                    </marquee>
                    <div className="mt-20"></div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
