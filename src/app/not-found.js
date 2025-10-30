'use client'
import { useEffect, useRef, useState } from "react";
import Topbar from "./components/Topbar";
import { useTranslation } from "react-i18next";

export default function NotFound(){
    const {t, i18n, ready } = useTranslation();
    const textRef = useRef(null);
    const [colorNum, setColorNum] = useState(100);

    useEffect(()=>{
        let status = true;
        let availableColors = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
        const intervalId = setInterval(()=>{
            setColorNum(prev => {
                let index = availableColors.indexOf(prev);

                if(status && index == availableColors.length - 1){
                    status = false;
                    return availableColors[index - 1];
                }else if(!status && index == 0){
                    status = true;
                    return availableColors[index + 1];
                }

                return availableColors[index + (status?1:-1)];
            })
        },120);

        return ()=>clearInterval(intervalId)
    },[])

    if(!ready) return <></>;
    return <>
    <div className="w-full h-full flex flex-col items-center justify-center">
        <span className={`text-purple-50 text-purple-100 text-purple-200 text-purple-300 text-purple-400 text-purple-500 text-purple-600 text-purple-700 text-purple-800 text-purple-900 text-purple-950`}></span>
        <p className="text-[16rem] font-bold text-portfolio-900 -mt-10">4<span ref={textRef} className={`font-medium text-purple-${colorNum}`}>0</span>4</p>
        <p className="text-xl font-medium text-portfolio-700">{t('portfolio.notfound.desc')}</p>
        <hr className="w-1/2 mt-2 border-portfolio-500" />
        <div>
            <Topbar />
        </div>
    </div>
    </>
}