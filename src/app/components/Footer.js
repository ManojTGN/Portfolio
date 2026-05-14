'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useTheme } from 'next-themes';

export default function Footer() {
    const { t, i18n, ready } = useTranslation();
    const { setTheme, resolvedTheme } = useTheme();
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);

    const displayNames = useMemo(
        () => new Intl.DisplayNames([i18n.language || 'en'], { type: 'language' }),
        [i18n.language]
    );

    useEffect(() => {
        if (!langOpen) return;
        const onDocClick = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setLangOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [langOpen]);

    if (!ready) return null;

    const languageName = displayNames.of(i18n.language);
    const supportedLngs = (i18n.options.supportedLngs || []).filter(l => l !== 'cimode');

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

    function pickLanguage(lng) {
        i18n.changeLanguage(lng);
        setLangOpen(false);
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
                    <button onClick={toggleTheme} className='underline capitalize' aria-label={resolvedTheme === 'dark' ? t('portfolio.footer.theme.switch.to.light') : t('portfolio.footer.theme.switch.to.dark')}><i className={`underline fa-solid fa-circle-half-stroke ${resolvedTheme === 'dark' ? 'fa-flip-horizontal' : ''}`} aria-hidden="true"></i> {resolvedTheme}</button>
                    <div className="relative" ref={langRef}>
                        <button
                            type="button"
                            onClick={() => setLangOpen(v => !v)}
                            className="underline hover:text-portfolio-950 dark:hover:text-white"
                            aria-haspopup="listbox"
                            aria-expanded={langOpen}
                            aria-label={t('portfolio.a11y.language')}
                        >
                            <i className="underline fa-solid fa-language" aria-hidden="true"></i> {languageName}
                        </button>
                        {langOpen && (
                            <ul
                                role="listbox"
                                aria-label={t('portfolio.a11y.language')}
                                className="absolute bottom-full mb-2 right-0 min-w-[10rem] bg-portfolio-50 dark:bg-portfolio-900 border dark:border-portfolio-700 border-portfolio-300 shadow-lg z-50 py-1"
                            >
                                {supportedLngs.map((lng) => {
                                    const selected = i18n.language === lng;
                                    return (
                                        <li key={lng}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={selected}
                                                onClick={() => pickLanguage(lng)}
                                                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-portfolio-100 dark:hover:bg-portfolio-800 ${selected ? 'font-medium text-portfolio-950 dark:text-white' : 'text-portfolio-500'}`}
                                            >
                                                {displayNames.of(lng)} <span className="opacity-60">({lng})</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                    <div className="w-[1px] border-2 rounded-full dark:border-portfolio-500 border-portfolio-950" aria-hidden="true"></div>
                    <a href="https://github.com/ManojTGN/Portfolio/issues/new" target="_blank" rel="noopener noreferrer" className="underline hover:text-portfolio-950 dark:hover:text-white">{t('portfolio.footer.report')}</a>
                </div>
            </div>
        </footer>
    );
}
