'use client'

import '../i18n';
import { useTranslation } from "react-i18next";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function Blogs() {
    const { t, i18n, ready } = useTranslation();
    if (!ready) return <></>;

    return (
        <>
            <div className="w-full flex flex-col items-center justify-start">
                <div className="w-11/12 md:w-9/12 lg:w-6/12 flex flex-col">
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500" />
                    <p className="text-base text-yellow-700 font-bold mt-20 text-center">{t('portfolio.blogs.coming.soon')}</p>
                    <div className="mt-20"></div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
