'use client'

import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { useTheme } from 'next-themes';

const displayNames = new Intl.DisplayNames(["en"], { type: "language" });

export default function Footer() {
    const { t, i18n, ready } = useTranslation();
    const { theme, setTheme } = useTheme();

    if (!ready) return null;

    const languageName = displayNames.of(i18n.language);

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <footer>
            <hr className="w-full mt-5 border-portfolio-500 dark:border-portfolio-500" />
            <div className="w-full text-portfolio-900 dark:text-portfolio-500 flex items-center gap-2">
                <div className="w-full flex items-center gap-1">
                    <i className="fa-regular fa-copyright mt-1" aria-hidden="true"></i>
                    <p>{t('portfolio.footer.copyrights.2026')}</p>
                </div>
                <div className="w-full flex items-center justify-end gap-2">
                    <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}><i className={`fa-solid fa-circle-half-stroke ${theme === 'dark' ? 'fa-flip-horizontal' : ''}`} aria-hidden="true"></i></button>
                    <Link href="/accessibility#language" className="underline hover:text-portfolio-950 dark:hover:text-white"> {languageName}</Link>
                    <Link href="/accessibility" className="underline hover:text-portfolio-950 dark:hover:text-white">{t('portfolio.footer.a11y')}</Link>
                    <a href="https://github.com/ManojTGN/Portfolio/issues/new" target="_blank" rel="noopener noreferrer" className="underline hover:text-portfolio-950 dark:hover:text-white">{t('portfolio.footer.report')}</a>
                </div>
            </div>
        </footer>
    );
}
