'use client'

import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from 'next-themes';

import Topbar from "../components/Topbar";
import FixedTopbar from "../components/FixedTopbar";
import Footer from "../components/Footer";
import { sizeMap, wordSpacingMap, letterSpacingMap, cursorSizes, pageTransitionValues } from '@/app/lib/accessibility';

export default function AccessibilityClient() {
    const { t, i18n, ready } = useTranslation();

    // Language names in the user's current language so the picker reads naturally
    // ("English / Español / Français…" rather than always English labels).
    const displayNames = useMemo(
        () => new Intl.DisplayNames([i18n.language || 'en'], { type: 'language' }),
        [i18n.language]
    );

    function changeLanguage(event) {
        i18n.changeLanguage(event.target.value);
    }

    const [fontSize, setFontSize] = useState('medium');

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        document.documentElement.style.setProperty('--base-font-size', sizeMap[size]);
        localStorage.setItem('fontSize', size);
    };

    const [wordSpacing, setWordSpacing] = useState('normal');

    const handleWordSpacingChange = (size) => {
        setWordSpacing(size);
        document.documentElement.style.setProperty('--word-spacing', wordSpacingMap[size]);
        localStorage.setItem('wordSpacing', size);
    };

    const [letterSpacing, setLetterSpacing] = useState('normal');

    const handleLetterSpacingChange = (size) => {
        setLetterSpacing(size);
        document.documentElement.style.setProperty('--letter-spacing', letterSpacingMap[size]);
        localStorage.setItem('letterSpacing', size);
    };

    const { theme, setTheme } = useTheme();
    function changeTheme(event) {
        const selectedTheme = event.target.value;
        if(!document.startViewTransition) {
            setTheme(selectedTheme);
            return;
        }
        
        document.startViewTransition(() => {
            setTheme(selectedTheme);
        });
    }

    const [pageTransition, setPageTransition] = useState('on');

    const handlePageTransitionChange = (value) => {
        setPageTransition(value);
        localStorage.setItem('pageTransition', value);
    };

    const [cursorSize, setCursorSize] = useState('default');

    const handleCursorSizeChange = (size) => {
        setCursorSize(size);
        if (size === 'default') {
            document.documentElement.removeAttribute('data-cursor-size');
        } else {
            document.documentElement.setAttribute('data-cursor-size', size);
        }
        localStorage.setItem('cursorSize', size);
    };

    useEffect(() => {
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize && sizeMap[savedFontSize]) {
            setFontSize(savedFontSize);
            document.documentElement.style.setProperty('--base-font-size', sizeMap[savedFontSize]);
        } else {
            document.documentElement.style.setProperty('--base-font-size', sizeMap['medium']);
        }

        const savedWordSpacing = localStorage.getItem('wordSpacing');
        if (savedWordSpacing && wordSpacingMap[savedWordSpacing]) {
            setWordSpacing(savedWordSpacing);
            document.documentElement.style.setProperty('--word-spacing', wordSpacingMap[savedWordSpacing]);
        }

        const savedLetterSpacing = localStorage.getItem('letterSpacing');
        if (savedLetterSpacing && letterSpacingMap[savedLetterSpacing]) {
            setLetterSpacing(savedLetterSpacing);
            document.documentElement.style.setProperty('--letter-spacing', letterSpacingMap[savedLetterSpacing]);
        }

        const savedCursorSize = localStorage.getItem('cursorSize');
        if (savedCursorSize && cursorSizes.includes(savedCursorSize)) {
            setCursorSize(savedCursorSize);
            if (savedCursorSize !== 'default') {
                document.documentElement.setAttribute('data-cursor-size', savedCursorSize);
            }
        }

        const savedPageTransition = localStorage.getItem('pageTransition');
        if (savedPageTransition && pageTransitionValues.includes(savedPageTransition)) {
            setPageTransition(savedPageTransition);
        }
    }, []);

    if (!ready) return null;

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <FixedTopbar triggerOffset={100} />
            <div className="w-11/12 sm:w-4/5 md:w-9/12 lg:w-6/12 xl:max-w-[1100px] 2xl:max-w-[1280px] flex flex-col justify-center">
                    <Topbar />
                    <main id="main-content">
                    <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>
                    <div className="flex items-center w-full mt-16 gap-2" id="accessibility">
                        <h1 className="w-full font-medium text-4xl dark:text-white">{t('portfolio.topbar.accessibility')}</h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full mt-10 gap-2" id="language">
                        <div className="w-full">
                            <h2 id="language-heading" className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.language')}</h2>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.language.desc')}</p>
                        </div>
                        <div className="ml-auto w-full md:w-2/6 p-2">
                            <label htmlFor="language-select" className="sr-only">{t('portfolio.a11y.language')}</label>
                            <select id="language-select" onChange={changeLanguage} value={i18n.language} className="dark:bg-portfolio-900 border dark:border-portfolio-600 dark:text-white text-sm block w-full p-2.5 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500">
                                {i18n.options.supportedLngs.map((language) => {
                                    if (language === 'cimode') return null;
                                    return <option key={language} value={language}>{displayNames.of(language)} ({language})</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full mt-10 gap-2" id="theme">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.color.theme')}</h2>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.color.theme.desc')}</p>
                        </div>
                        <div className="ml-auto w-full md:w-2/6 p-2">
                            <label htmlFor="theme-select" className="sr-only">{t('portfolio.a11y.color.theme')}</label>
                            <select id="theme-select" onChange={changeTheme} value={theme} className="dark:bg-portfolio-900 border dark:border-portfolio-600 dark:text-white text-sm block w-full p-2.5 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500">
                                <option value="system">{t('portfolio.a11y.color.theme.system')}</option>
                                <option value="dark">{t('portfolio.a11y.color.theme.dark')}</option>
                                <option value="light">{t('portfolio.a11y.color.theme.light')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full mt-10 gap-2" id="fontSize">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.font.size')}</h2>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.font.size.desc')}</p>
                        </div>
                        <div className="ml-auto w-full p-2">
                            <ul className="grid w-full gap-6 md:grid-cols-3" role="radiogroup" aria-label={t('portfolio.a11y.font.size')}>
                                <li>
                                    <input onChange={() => handleFontSizeChange('small')} type="radio" id="smallFont" name="fontSize" value="small" className="sr-only peer" checked={fontSize === 'small'} />
                                    <label htmlFor="smallFont" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.font.size.small')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleFontSizeChange('medium')} type="radio" id="mediumFont" name="fontSize" value="medium" className="sr-only peer" checked={fontSize === 'medium'} />
                                    <label htmlFor="mediumFont" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.font.size.medium')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleFontSizeChange('large')} type="radio" id="largeFont" name="fontSize" value="large" className="sr-only peer" checked={fontSize === 'large'} />
                                    <label htmlFor="largeFont" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.font.size.large')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full mt-10 gap-2" id="wordSpacing">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.word.spacing')}</h2>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.word.spacing.desc')}</p>
                        </div>
                        <div className="ml-auto w-full p-2">
                            <ul className="grid w-full gap-6 md:grid-cols-3" role="radiogroup" aria-label={t('portfolio.a11y.word.spacing')}>
                                <li>
                                    <input onChange={() => handleWordSpacingChange('normal')} type="radio" id="normalWordSpacing" name="wordSpacing" value="normal" className="sr-only peer" checked={wordSpacing === 'normal'} />
                                    <label htmlFor="normalWordSpacing" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.spacing.normal')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleWordSpacingChange('medium')} type="radio" id="mediumWordSpacing" name="wordSpacing" value="medium" className="sr-only peer" checked={wordSpacing === 'medium'} />
                                    <label htmlFor="mediumWordSpacing" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.spacing.medium')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleWordSpacingChange('large')} type="radio" id="largeWordSpacing" name="wordSpacing" value="large" className="sr-only peer" checked={wordSpacing === 'large'} />
                                    <label htmlFor="largeWordSpacing" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.spacing.large')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full mt-10 gap-2" id="letterSpacing">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.letter.spacing')}</h2>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.letter.spacing.desc')}</p>
                        </div>
                        <div className="ml-auto w-full p-2">
                            <ul className="grid w-full gap-6 md:grid-cols-3" role="radiogroup" aria-label={t('portfolio.a11y.letter.spacing')}>
                                <li>
                                    <input onChange={() => handleLetterSpacingChange('normal')} type="radio" id="normalLetterSpacing" name="letterSpacing" value="normal" className="sr-only peer" checked={letterSpacing === 'normal'} />
                                    <label htmlFor="normalLetterSpacing" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.spacing.normal')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleLetterSpacingChange('medium')} type="radio" id="mediumLetterSpacing" name="letterSpacing" value="medium" className="sr-only peer" checked={letterSpacing === 'medium'} />
                                    <label htmlFor="mediumLetterSpacing" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.spacing.medium')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleLetterSpacingChange('large')} type="radio" id="largeLetterSpacing" name="letterSpacing" value="large" className="sr-only peer" checked={letterSpacing === 'large'} />
                                    <label htmlFor="largeLetterSpacing" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.spacing.large')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full mt-10 gap-2" id="cursorSize">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.cursor.size')}</h2>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.cursor.size.desc')}</p>
                        </div>
                        <div className="ml-auto w-full p-2">
                            <ul className="grid w-full gap-6 md:grid-cols-2" role="radiogroup" aria-label={t('portfolio.a11y.cursor.size')}>
                                <li>
                                    <input onChange={() => handleCursorSizeChange('default')} type="radio" id="defaultCursor" name="cursorSize" value="default" className="sr-only peer" checked={cursorSize === 'default'} />
                                    <label htmlFor="defaultCursor" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.default')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleCursorSizeChange('small')} type="radio" id="smallCursor" name="cursorSize" value="small" className="sr-only peer" checked={cursorSize === 'small'} />
                                    <label htmlFor="smallCursor" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.small')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleCursorSizeChange('medium')} type="radio" id="mediumCursor" name="cursorSize" value="medium" className="sr-only peer" checked={cursorSize === 'medium'} />
                                    <label htmlFor="mediumCursor" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.medium')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleCursorSizeChange('large')} type="radio" id="largeCursor" name="cursorSize" value="large" className="sr-only peer" checked={cursorSize === 'large'} />
                                    <label htmlFor="largeCursor" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.large')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center w-full mt-10 gap-2" id="pageTransition">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.page.transition')}</h2>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.page.transition.desc')}</p>
                        </div>
                        <div className="ml-auto w-full p-2">
                            <ul className="grid w-full gap-6 md:grid-cols-2" role="radiogroup" aria-label={t('portfolio.a11y.page.transition')}>
                                <li>
                                    <input onChange={() => handlePageTransitionChange('on')} type="radio" id="transitionOn" name="pageTransition" value="on" className="sr-only peer" checked={pageTransition === 'on'} />
                                    <label htmlFor="transitionOn" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.page.transition.on')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handlePageTransitionChange('off')} type="radio" id="transitionOff" name="pageTransition" value="off" className="sr-only peer" checked={pageTransition === 'off'} />
                                    <label htmlFor="transitionOff" className="peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 inline-flex items-center justify-between w-full min-h-[44px] p-2 dark:text-portfolio-500 dark:bg-portfolio-900 border dark:border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 dark:hover:bg-gray-700">
                                        {t('portfolio.a11y.page.transition.off')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start w-full mt-10 gap-2" id="keyboardNavigation">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.keyboard.navigation')}</h2>
                            <p className="w-full text-lg text-portfolio-500 mt-2">{t('portfolio.a11y.keyboard.navigation.desc')}</p>
                            <p className="w-full text-sm text-portfolio-400 mt-3 italic">{t('portfolio.a11y.keyboard.navigation.note')}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start w-full mt-10 gap-2" id="mobileViewport">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.mobile.viewport')}</h2>
                            <p className="w-full text-lg text-portfolio-500 mt-2">{t('portfolio.a11y.mobile.viewport.desc')}</p>
                            <p className="w-full text-sm text-portfolio-400 mt-3 italic">{t('portfolio.a11y.mobile.viewport.note')}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start w-full mt-10 gap-2" id="browserSupport">
                        <div className="w-full">
                            <h2 className="w-full font-medium text-2xl dark:text-white">{t('portfolio.a11y.browser.support')}</h2>
                            <p className="w-full text-lg text-portfolio-500 mt-2">{t('portfolio.a11y.browser.support.desc')}</p>
                            <ul className="w-full mt-4 grid grid-cols-2 md:grid-cols-3 gap-3" aria-label={t('portfolio.a11y.browser.support')}>
                                <li className="flex items-center gap-2 p-2 border dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-900">
                                    <i className="fa-brands fa-chrome text-2xl text-portfolio-500" aria-hidden="true"></i>
                                    <span className="dark:text-portfolio-50 text-portfolio-950">{t('portfolio.a11y.browser.chrome')}</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 border dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-900">
                                    <i className="fa-brands fa-firefox-browser text-2xl text-portfolio-500" aria-hidden="true"></i>
                                    <span className="dark:text-portfolio-50 text-portfolio-950">{t('portfolio.a11y.browser.firefox')}</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 border dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-900">
                                    <i className="fa-brands fa-edge text-2xl text-portfolio-500" aria-hidden="true"></i>
                                    <span className="dark:text-portfolio-50 text-portfolio-950">{t('portfolio.a11y.browser.edge')}</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 border dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-900">
                                    <i className="fa-brands fa-safari text-2xl text-portfolio-500" aria-hidden="true"></i>
                                    <span className="dark:text-portfolio-50 text-portfolio-950">{t('portfolio.a11y.browser.safari')}</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 border dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-900">
                                    <i className="fa-brands fa-opera text-2xl text-portfolio-500" aria-hidden="true"></i>
                                    <span className="dark:text-portfolio-50 text-portfolio-950">{t('portfolio.a11y.browser.opera')}</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 border dark:border-portfolio-700 border-portfolio-300 dark:bg-portfolio-900">
                                    <i className="fa-solid fa-shield-halved text-2xl text-portfolio-500" aria-hidden="true"></i>
                                    <span className="dark:text-portfolio-50 text-portfolio-950">{t('portfolio.a11y.browser.brave')}</span>
                                </li>
                            </ul>
                            <p className="w-full text-sm text-portfolio-400 mt-3 italic">{t('portfolio.a11y.browser.support.note')}</p>
                        </div>
                    </div>

                    </main>
                    <div className="mt-20">
                        <Footer />
                    </div>
                </div>
            </div>
    );
}
