'use client'

import { useEffect, useRef, useState } from "react";
import ProfileContainer from "./components/profileContainer";
import ProjectsContainer from "./components/projectsContainer";

export default function Home() {
    return (
        <div className="w-full h-full flex items-center justify-center">
        <main className={`h-[1080px] w-[1920px] flex items-center justify-center rounded-md `}>
            
            <div className="h-[720px] w-[1600px] flex gap-3">
            <ProfileContainer />
            
            <div className="w-full h-full flex flex-col gap-3">
                <ProjectsContainer />

                <div className="w-full rounded-md border border-neutral-800 bg-neutral-900 py-2">
                    <p className="text-md indent-10 text-neutral-400 text-start px-5">
                        I&apos;m <span className="text-yellow-300 hover:text-yellow-500 hover:cursor-pointer">Manoj</span>, 
                        aspiring Coder, interested in Computer Graphics and I&apos;d love to enhance 
                        my knowledge about new and emerging trends in Information Technology domain. Thanks for visiting 
                        and I&apos;d love to connect!
                    </p>
                </div>

                <div className="w-full flex gap-3 transition-all">
                    <div className="w-full py-2 rounded-md border border-neutral-800 bg-neutral-900 flex items-center gap-1 px-5 opacity-80 hover:opacity-100">
                        <h1 className="w-full text-xl text-purple-500"><i className="fa-solid fa-trophy text-purple-500"></i> My Other Random<i className="fa-solid fa-dice fa-2xs"></i> Interests & Works</h1>    
                        <a target="_self" href="../interest" className="px-7 py-1 font-bold text-neutral-950 bg-neutral-500 hover:bg-purple-500 rounded-md transition-all hover:scale-105">Mmm.. </a>
                    </div>
                </div>
            </div>

            </div>
        </main>
        </div>
    );
}
