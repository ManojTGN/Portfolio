'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const BASE_STYLE = "dark:hover:text-portfolio-50 hover:underline px-2 py-2 min-h-[44px] inline-flex items-center";
const ACTIVE_STYLE = "text-portfolio-950 dark:text-white font-medium underline cursor-default";
const INACTIVE_STYLE = "dark:text-portfolio-500 cursor-pointer";

function NavLink({ href, isActive, children }) {
    return (
        <Link href={href} className={`${BASE_STYLE} ${isActive ? ACTIVE_STYLE : INACTIVE_STYLE}`}>
            {children}
        </Link>
    );
}

export default function Topbar() {
    const { t } = useTranslation();
    const pathName = usePathname();

    return (
        <nav className="w-full flex items-center justify-end gap-2 md:gap-5 pt-2 text-sm md:text-base">
            <NavLink href="/" isActive={pathName === '/'}>{t('portfolio.topbar.home')}</NavLink>
            <NavLink href="/work" isActive={pathName.startsWith('/work')}>{t('portfolio.topbar.work')}</NavLink>
            <NavLink href="/contact" isActive={pathName === '/contact'}>{t('portfolio.topbar.contact')}</NavLink>
            <div className="w-[1px] border-2 rounded-full dark:border-portfolio-500 border-portfolio-950" aria-hidden="true"></div>
            <NavLink href="/accessibility" isActive={pathName === '/accessibility'}>{t('portfolio.footer.a11y')}</NavLink>
        </nav>
    );
}
