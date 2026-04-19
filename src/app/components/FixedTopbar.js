'use client'

import Link from "next/link";
import { Mrs_Saint_Delafield } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const signatureFont = Mrs_Saint_Delafield({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const BASE_STYLE = "dark:hover:text-portfolio-50 hover:underline p-1";
const ACTIVE_STYLE = "text-portfolio-950 dark:text-white font-medium underline cursor-default";
const INACTIVE_STYLE = "dark:text-portfolio-500 cursor-pointer";

function NavLink({ href, isActive, children }) {
    return (
        <Link href={href} className={`${BASE_STYLE} ${isActive ? ACTIVE_STYLE : INACTIVE_STYLE}`}>
            {children}
        </Link>
    );
}

export default function FixedTopbar({ triggerOffset = 260 }) {
    const { t } = useTranslation();
    const pathName = usePathname();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > triggerOffset);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [triggerOffset]);

    return (
        <div
            aria-hidden={!visible}
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 w-11/12 md:w-9/12 lg:w-7/12 backdrop-blur-md bg-portfolio-50/80 dark:bg-portfolio-950/80 transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : '-translate-y-[200%]'}`}
        >
            <div className="flex items-center gap-4 py-2">
                <div className="flex-1 min-w-0">
                    <span className={`${signatureFont.className} font-bold text-3xl md:text-4xl pt-3 pl-3 pb-3 leading-none text-portfolio-950 dark:text-white truncate block`}>
                        {t('portfolio.top.realname')}
                    </span>
                </div>
                <nav className="flex items-center gap-2 md:gap-5 text-sm md:text-base" aria-label="Primary">
                    <NavLink href="/" isActive={pathName === '/'}>{t('portfolio.topbar.home')}</NavLink>
                    <NavLink href="/work" isActive={pathName.startsWith('/work')}>{t('portfolio.topbar.work')}</NavLink>
                    <NavLink href="/contact" isActive={pathName === '/contact'}>{t('portfolio.topbar.contact')}</NavLink>
                    <div className="w-[1px] border-2 rounded-full dark:border-portfolio-500 border-portfolio-950" aria-hidden="true"></div>
                    <NavLink href="/accessibility" isActive={pathName === '/accessibility'}>{t('portfolio.footer.a11y')}</NavLink>
                </nav>
            </div>
            <div className="wavy-line absolute top-[91.5%] left-0 right-0 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>
        </div>
    );
}
