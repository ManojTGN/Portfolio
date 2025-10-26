import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

export default function Skills(){
    const {t, i18n, ready } = useTranslation();    
    const [languages, setLanguages] = useState({});
    const [totalBytes, setTotalBytes] = useState(0);

    useEffect(()=>{
        async function getSkills(){
            try {
                const res = await fetch("/api/getSkills", {method: "GET"});
                const data = await res.json();

                if (res.ok) {
                    setLanguages(data);
                    console.log(data);

                    const total = Object.values(data).reduce((acc, val) => acc + val, 0);
                    setTotalBytes(total);
                } else {
                    console.error("Error:", data);
                }
            } catch (err) {
                console.error("Network Error:", err);
            }
        }
        getSkills();
    },[])

    return <>
    <div className="grid grid-cols-3 grid-rows-1 gap-5">
        {Object.entries(languages).map(([lang, bytes]) => {
            const percent = totalBytes ? (bytes / totalBytes) * 100 : 0;
            return (
            <div key={lang} className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
                <p className="text-portfolio-500 font-bold text-xl">{lang}</p>
                <span className="text-portfolio-500 font-medium">{Math.round(percent)}%</span>
            </div>
            )
        })}
    </div>
    <div className="grid grid-cols-3 grid-rows-1 gap-5 mt-5">
        <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
            <p className="text-portfolio-500 font-medium text-xl">Adobe Photoshop</p>
        </div>
        <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
            <p className="text-portfolio-500 font-medium text-xl">Adobe Premiere Pro</p>
        </div>
        <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
            <p className="text-portfolio-500 font-medium text-xl">Figma</p>
        </div>
        <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
            <p className="text-portfolio-500 font-medium text-xl">Steam Game Guide</p>
        </div>
        <div className="w-full border-l-2 pl-5 border-portfolio-500 mt-5">
            <p className="text-portfolio-500 font-medium text-xl">Open Source Contrib</p>
        </div>
    </div>
    <div className="w-full mt-10">
        <p className="text-portfolio-500 font-medium text-base">
            {t('portfolio.skills.stats.info')} <a href="/work" className="underline text-portfolio-300 cursor-pointer">{t('portfolio.skills.stats.work.page')}</a>.
        </p>
    </div>
    </>
}