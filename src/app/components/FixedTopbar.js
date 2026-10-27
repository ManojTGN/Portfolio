"use client";

import { Mrs_Saint_Delafield } from "next/font/google";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SiteNav from "./SiteNav";
import { PAGE_CONTAINER } from "@/app/lib/ui";

const signatureFont = Mrs_Saint_Delafield({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export default function FixedTopbar({ triggerOffset = 260 }) {
    const { t } = useTranslation();
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        const syncPinnedState = () => setIsPinned(window.scrollY > triggerOffset);

        syncPinnedState();
        window.addEventListener("scroll", syncPinnedState, { passive: true });
        return () => window.removeEventListener("scroll", syncPinnedState);
    }, [triggerOffset]);

    return (
        <div
            aria-hidden={!isPinned}
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 ${PAGE_CONTAINER} backdrop-blur-md bg-portfolio-50/80 dark:bg-portfolio-950/80 transition-transform duration-300 ease-out ${isPinned ? "translate-y-0" : "-translate-y-[200%]"}`}
        >
            <div className="flex items-center gap-4 py-2">
                <div className="flex-1 min-w-0">
                    <span
                        className={`${signatureFont.className} font-bold text-3xl md:text-4xl pt-3 pl-3 pb-3 leading-none text-portfolio-950 dark:text-white truncate block`}
                    >
                        {t("portfolio.top.realname")}
                    </span>
                </div>
                <SiteNav />
            </div>
            <div
                className="wavy-line absolute top-[91.5%] left-0 right-0 bg-portfolio-950 dark:bg-portfolio-500"
                aria-hidden="true"
            ></div>
        </div>
    );
}
