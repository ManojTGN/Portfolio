"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const LINK_BASE = "dark:hover:text-portfolio-50 hover:underline px-2 py-2 min-h-[44px] inline-flex items-center";
const LINK_ACTIVE = "text-portfolio-950 dark:text-white font-medium underline cursor-default";
const LINK_IDLE = "dark:text-portfolio-500 cursor-pointer";

const PRIMARY_LINKS = [
    { href: "/", labelKey: "portfolio.topbar.home", matchExactly: true },
    { href: "/work", labelKey: "portfolio.topbar.work", matchExactly: false },
    { href: "/sidequests", labelKey: "portfolio.topbar.sidequests", matchExactly: true },
    { href: "/contact", labelKey: "portfolio.topbar.contact", matchExactly: true },
];

const SETTINGS_LINK = { href: "/accessibility", labelKey: "portfolio.footer.a11y", matchExactly: true };

export default function SiteNav({ className = "", ariaLabel }) {
    const { t } = useTranslation();
    const pathname = usePathname();

    const navLink = ({ href, labelKey, matchExactly }) => {
        const isCurrent = matchExactly ? pathname === href : pathname.startsWith(href);
        return (
            <Link
                key={href}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={`${LINK_BASE} ${isCurrent ? LINK_ACTIVE : LINK_IDLE}`}
            >
                {t(labelKey)}
            </Link>
        );
    };

    return (
        <nav aria-label={ariaLabel} className={`flex items-center gap-2 md:gap-5 text-sm md:text-base ${className}`}>
            {PRIMARY_LINKS.map(navLink)}
            <div
                className="w-[1px] border-2 rounded-full dark:border-portfolio-500 border-portfolio-950"
                aria-hidden="true"
            ></div>
            {navLink(SETTINGS_LINK)}
        </nav>
    );
}
