'use client'

import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { useTheme } from 'next-themes';

const displayNames = new Intl.DisplayNames(["en"], { type: "language" });

export default function Footer() {
    const { t, i18n, ready } = useTranslation();
    const { setTheme, resolvedTheme } = useTheme();

    if (!ready) return null;

    const languageName = displayNames.of(i18n.language);

    function toggleTheme() {
        const selectedTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        if(!document.startViewTransition) {
            setTheme(selectedTheme);
            return;
        }
        
        document.startViewTransition(() => {
            setTheme(selectedTheme);
        });
    }

    return (
        <footer>
            <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>
            <div className="w-full text-portfolio-900 dark:text-portfolio-500 flex items-center gap-2">
                <div className="w-full flex items-center gap-1">
                    <i className="fa-regular fa-copyright mt-1" aria-hidden="true"></i>
                    <p>{t('portfolio.footer.copyrights.2026')}</p>
                </div>
                <div className="w-full flex items-center justify-end gap-2">
                    <button onClick={toggleTheme} className='underline capitalize' aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}><i className={`underline fa-solid fa-circle-half-stroke ${resolvedTheme === 'dark' ? 'fa-flip-horizontal' : ''}`} aria-hidden="true"></i> {resolvedTheme}</button>
                    <Link href="/accessibility#language" className="underline hover:text-portfolio-950 dark:hover:text-white"> <i className="underline fa-solid fa-language"></i> {languageName}</Link>
                    <div className="w-[1px] border-2 rounded-full dark:border-portfolio-500 border-portfolio-950" aria-hidden="true"></div>
                    <a href="https://github.com/ManojTGN/Portfolio/issues/new" target="_blank" rel="noopener noreferrer" className="underline hover:text-portfolio-950 dark:hover:text-white">{t('portfolio.footer.report')}</a>
                </div>
            </div>
        </footer>
    );
}
