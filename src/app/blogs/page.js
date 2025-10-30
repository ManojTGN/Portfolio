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
                    <hr className="w-full mt-5 border-portfolio-500" />
                    <p className="text-center text-lg font-medium text-yellow-600 mt-5"> Blogs Are Coming Soon!</p>
                    <div className="mt-20"></div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
