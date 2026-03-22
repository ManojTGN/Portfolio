'use client'
import { useEffect, useState } from "react";
import Topbar from "./components/Topbar";
import { useTranslation } from "react-i18next";

const AVAILABLE_COLORS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export default function NotFound() {
    const { t, ready } = useTranslation();
    const [colorNum, setColorNum] = useState(100);

    useEffect(() => {
        let ascending = true;
        const intervalId = setInterval(() => {
            setColorNum(prev => {
                let index = AVAILABLE_COLORS.indexOf(prev);

                if (ascending && index === AVAILABLE_COLORS.length - 1) {
                    ascending = false;
                    return AVAILABLE_COLORS[index - 1];
                } else if (!ascending && index === 0) {
                    ascending = true;
                    return AVAILABLE_COLORS[index + 1];
                }

                return AVAILABLE_COLORS[index + (ascending ? 1 : -1)];
            });
        }, 120);

        return () => clearInterval(intervalId);
    }, []);

    if (!ready) return null;

    return (
        <main id="main-content" className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-[16rem] font-bold text-portfolio-900 -mt-10" aria-label="404 - Page not found">
                <span aria-hidden="true">4</span>
                <span className={`font-medium text-purple-${colorNum}`} aria-hidden="true">0</span>
                <span aria-hidden="true">4</span>
            </h1>
            <p className="text-xl font-medium text-portfolio-700">{t('portfolio.notfound.desc')}</p>
            <hr className="w-1/2 mt-2 border-portfolio-500" aria-hidden="true" />
            <Topbar />
        </main>
    );
}
