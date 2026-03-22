'use client'

import { useTranslation } from "react-i18next";

import Topbar from "../components/Topbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function ContactPage() {
    const { t, ready } = useTranslation();

    if (!ready) return null;

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="w-11/12 md:w-9/12 lg:w-6/12 flex flex-col">
                <Topbar />
                <hr className="w-full mt-5 border-portfolio-500" aria-hidden="true" />
                <main id="main-content">
                    <section className="mt-16" aria-labelledby="contact-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="contact-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.contact')}</h2>
                            <p className="w-full text-start md:text-end text-portfolio-500 dark:text-portfolio-700 text-xl md:text-2xl lg:text-3xl font-medium">{t('portfolio.contact.fun')}</p>
                        </div>
                        <Contact />
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
