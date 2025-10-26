import { useEffect, useState } from "react";


export default function Topbar(){
    const [pathName, setPathName] = useState("");
    useEffect(() => {
        setPathName(window.location.pathname);
    }, []);

    return <>
        <div className="w-full flex items-center justify-end gap-5 pt-2">
            <a href="/" className={"text-portfolio-500 hover:text-portfolio-50 hover:underline p-1 " + (pathName==='/'?" text-white font-medium underline cursor-default":" cursor-pointer")}>Home</a>
            <a href="/work" className={"text-portfolio-500 hover:text-portfolio-50 hover:underline p-1" + (pathName==='/work'?" text-white font-medium underline cursor-default":" cursor-pointer")}>Work</a>
            <a href="/#contact" className={"text-portfolio-500 hover:text-portfolio-50 hover:underline p-1"}>Contact</a>
        </div>
    </>
}