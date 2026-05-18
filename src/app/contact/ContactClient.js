'use client'

import { useTranslation } from "react-i18next";

import Topbar from "../components/Topbar";
import FixedTopbar from "../components/FixedTopbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function ContactClient() {
    const { t } = useTranslation();

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <FixedTopbar triggerOffset={100} />
            <div className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-[70%] max-w-[1400px] flex flex-col">
                <Topbar />
                <main id="main-content">
                    <div className="mt-5 flex flex-col items-start">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-portfolio-950 dark:text-white font-bold">
                            {t('portfolio.contact')}
                        </h1>
                    </div>
                    <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>
                    <section className="mt-16" aria-labelledby="contact-heading">
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2">
                            <h2 id="contact-heading" className="w-full font-medium text-2xl md:text-3xl lg:text-4xl text-portfolio-950 dark:text-white">{t('portfolio.contact.lets.work.together')}</h2>
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
