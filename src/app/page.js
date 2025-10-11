'use client'

import { useTranslation } from "react-i18next";
import TopBar from "./components/TopBar/TopBar";
import Paint from "./components/Paint";

export default function Home() {
    const {t, i18n } = useTranslation();
    return (
        <>
            <div className="w-full h-full flex flex-col items-center font-portfolio dark:text-white text-black p-2">
                <div className="w-5/6 flex flex-col items-center">
                    <TopBar />
                    <div className="w-full flex flex-col h-[500px] mt-20 bg-neutral-900 relative">
                        <Paint />
                        <div className="h-full">

                        </div>
                        <div className="h-full flex flex-col justify-end p-5 gap-2">
                                <p className="text-end text-5xl font-bold"> {t('portfolio.about.me')}</p>
                                <p className="text-end text-neutral-600 font-bold"> {t('portfolio.about.me.desc')}</p>
                        </div>
                    </div>
                    <hr className="border w-full " />

                    <div className="mt-36 w-full" >
                        <p className="text-start text-4xl font-[600] pb-5">
                            {t('portfolio.about.my.secret.sauce')}
                        </p>
                        <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[500px]">
                            <div className="col-span-2 row-span-2 bg-neutral-900 relative">
                                <div className="absolute w-full">
                                    <p className="text-8xl font-bold text-neutral-800 text-end p-4">01</p>
                                </div>
                            </div>
                            <div className="col-span-2 row-span-2 col-start-3 bg-neutral-900 relative">
                                <div className="absolute w-full">
                                    <p className="text-8xl font-bold text-neutral-800 text-end p-4">02</p>
                                </div>
                            </div>
                            <div className="col-span-4 row-span-2 row-start-3 bg-neutral-900 relative">
                                <div className="absolute w-full">
                                    <p className="text-8xl font-bold text-neutral-800 text-end p-4">03</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border w-full " />

                    <div className="mt-36 w-full">
                        <p className="text-start text-4xl font-[600] pb-5">
                            {t('portfolio.about.my.journey')}
                        </p>
                        <div className="w-full h-[800px] bg-neutral-900">

                        </div>
                    </div>
                    <hr className="border w-full " />

                    <div className="mt-36 w-full">
                        <p className="text-start text-4xl font-[600] pb-5">
                            {t('portfolio.topbar.contact')}
                        </p>
                        <div className="flex flex-row w-full h-[350px] gap-3">
                            <div className="w-3/12 h-full bg-neutral-900">
                            <div className="h-full w-full flex flex-col items-end justify-end p-4">
                                <p className="text-neutral-600 text-xl font-bold">Dont Be Shy</p>
                                <p className="text-6xl font-bold">Say Hello</p>
                            </div>
                            <hr className="border w-full" />
                            </div>  
                            <div className="w-9/12 h-full bg-neutral-900">
                            <div className="h-full">

                            </div>
                            <hr className="border w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-end w-full">
                        2025. Manoj A. All Rights Reserved.
                    </div>
                </div>
            </div>
        </>
    );
}
