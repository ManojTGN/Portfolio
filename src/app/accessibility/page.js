'use client'

import { useTranslation } from "react-i18next";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Accessibility() {
    const {t, i18n, ready } = useTranslation();

    //Change Language ----------------------------------------------------------------------------------
    function changeLanguage(event){
        i18n.changeLanguage(event.target.value);
    }


    //Change Font Size ----------------------------------------------------------------------------------
    const [fontSize, setFontSize] = useState('medium');
    const sizeMap = {
        small: '11px',
        medium: '15px',
        large: '19px'
    };

    const handleFontSizeChange = (size) => {
        setFontSize(size);
        document.documentElement.style.setProperty('--base-font-size', sizeMap[size]);
        document.cookie = `fontSize=${size}; path=/; SameSite=Lax`;
    };

    useEffect(() => {
        const match = document.cookie.match(/fontSize=([^;]+)/);
        if (match) {
            setFontSize(match[1]);
            document.documentElement.style.setProperty('--base-font-size', sizeMap[match[1]]);
        } else {
            document.documentElement.style.setProperty('--base-font-size', sizeMap['medium']);
        }
    }, []);

    //Change Theme ------------------------------------------------------------------------------------
    function changeTheme(theme){
        console.log(theme)
    }

    //Change Cursor Size ------------------------------------------------------------------------------------
    const [cursorSize, setCursorSize] = useState('default');
    
    const handleCursorSizeChange = (size) => {
        setCursorSize(size);
        // document.cookie = `cursorSize=${size}; path=/; SameSite=Lax`;
    };

    if (!ready) return <></>;
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-6/12 flex flex-col justify-center">
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500" />
                    <div className="flex items-center w-full mt-16 gap-2" id="accessibility">
                        <a href="#accessibility" className="w-full font-medium text-4xl text-white">{t('portfolio.topbar.accessibility')}</a>
                    </div>

                    <div className="flex items-center w-full mt-10 gap-2" id="language">
                        <div className="w-full">
                            <a href="#language" className="w-full font-medium text-2xl text-white">{t('portfolio.a11y.language')}</a>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.language.desc')}</p>
                        </div>
                        <div className="ml-auto w-2/6 p-2">
                           <select onChange={changeLanguage} value={i18n.language} className="bg-portfolio-900 border border-portfolio-600 text-white text-sm block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500">
                                {i18n.options.supportedLngs.map((language)=>{
                                    if(language === 'cimode') return;
                                    const languageName = new Intl.DisplayNames(["en"], { type: "language" }).of(language);
                                    return <option key={language} value={language}>{languageName} ({language})</option>
                                })}
                           </select>
                        </div>
                    </div>

                    <div className="flex items-center w-full mt-10 gap-2" id="fontSize">
                        <div className="w-full">
                            <a href="#fontSize" className="w-full font-medium text-2xl text-white">{t('portfolio.a11y.font.size')}</a>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.font.size.desc')}</p>
                        </div>
                        <div className="ml-auto w-full p-2">
                            <ul className="grid w-full gap-6 md:grid-cols-3">
                                <li>
                                    <input onChange={() => handleFontSizeChange('small')} type="radio" id="smallFont" name="fontSize" value="small" className="hidden peer" checked={fontSize==='small'}/>
                                    <label htmlFor="smallFont" className="inline-flex items-center justify-between w-full p-2 text-portfolio-500 bg-portfolio-900 border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 hover:bg-gray-700">
                                        {t('portfolio.a11y.font.size.small')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleFontSizeChange('medium')} type="radio" id="mediumFont" name="fontSize" value="medium" className="hidden peer" checked={fontSize==='medium'}/>
                                    <label htmlFor="mediumFont" className="inline-flex items-center justify-between w-full p-2 text-portfolio-500 bg-portfolio-900 border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 hover:bg-gray-700">
                                        {t('portfolio.a11y.font.size.medium')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleFontSizeChange('large')} type="radio" id="largeFont" name="fontSize" value="large" className="hidden peer" checked={fontSize==='large'}/>
                                    <label htmlFor="largeFont" className="inline-flex items-center justify-between w-full p-2 text-portfolio-500 bg-portfolio-900 border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 hover:bg-gray-700">
                                        {t('portfolio.a11y.font.size.large')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center w-full mt-10 gap-2" id="theme">
                        <div className="w-full">
                            <a href="#theme" className="w-full font-medium text-2xl text-white">{t('portfolio.a11y.color.theme')} <span className="text-xs px-2 bg-yellow-600 text-black font-bold">In Development</span></a>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.color.theme.desc')}</p>
                        </div>
                        <div className="ml-auto w-2/6 p-2">
                           <select onChange={changeTheme} value={i18n.language} className="bg-portfolio-900 border border-portfolio-600 text-white text-sm block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500">
                                <option value={"dark"}>{t('portfolio.a11y.color.theme.dark')}</option>
                                <option value={"light"}>{t('portfolio.a11y.color.theme.light')}</option>
                           </select>
                        </div>
                    </div>

                    <div className="flex items-center w-full mt-10 gap-2" id="cursorSize">
                        <div className="w-full">
                            <a href="#cursorSize" className="w-full font-medium text-2xl text-white">{t('portfolio.a11y.cursor.size')} <span className="text-xs px-2 bg-yellow-600 text-black font-bold">In Development</span></a>
                            <p className="w-full text-lg text-portfolio-500">{t('portfolio.a11y.cursor.size.desc')}</p>
                        </div>
                        <div className="ml-auto w-full p-2">
                            <ul className="grid w-full gap-6 md:grid-cols-2">
                                <li>
                                    <input onChange={() => handleCursorSizeChange('default')} type="radio" id="defaultCursor" name="cursorSize" value="small" className="hidden peer" checked={cursorSize==='default'}/>
                                    <label htmlFor="defaultCursor" className="inline-flex items-center justify-between w-full p-2 text-portfolio-500 bg-portfolio-900 border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.default')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleCursorSizeChange('small')} type="radio" id="smallCursor" name="cursorSize" value="small" className="hidden peer" checked={cursorSize==='small'}/>
                                    <label htmlFor="smallCursor" className="inline-flex items-center justify-between w-full p-2 text-portfolio-500 bg-portfolio-900 border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.small')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleCursorSizeChange('medium')} type="radio" id="mediumCursor" name="cursorSize" value="medium" className="hidden peer" checked={cursorSize==='medium'}/>
                                    <label htmlFor="mediumCursor" className="inline-flex items-center justify-between w-full p-2 text-portfolio-500 bg-portfolio-900 border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.medium')}
                                    </label>
                                </li>
                                <li>
                                    <input onChange={() => handleCursorSizeChange('large')} type="radio" id="largeCursor" name="cursorSize" value="large" className="hidden peer" checked={cursorSize==='large'}/>
                                    <label htmlFor="largeCursor" className="inline-flex items-center justify-between w-full p-2 text-portfolio-500 bg-portfolio-900 border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:border-2 peer-checked:text-blue-600 hover:bg-gray-700">
                                        {t('portfolio.a11y.cursor.size.large')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20"></div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
