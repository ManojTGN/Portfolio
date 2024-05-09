import { useState } from "react"

export default function BattleContainer({ image, hoverImage, header, hoveredHeader, link, className }){

    const[isHovered, setIsHovered] = useState(false);

    return <a href={link} target="_blank" onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className={`bg-neutral-900 hover:bg-neutral-800 rounded-md flex flex-col gap-2 p-3 hover:cursor-pointer hover:border-2 border-yellow-300 hover:scale-105 transition-all `+className}>
        <div className="w-full">
            <img src={isHovered && hoverImage?hoverImage:image?image:hoverImage} className={`w-full rounded-md `} />
        </div>
        <p className="text-xl font-bold text-white flex gap-2 items-center">
            {isHovered?
             <> <span className="text-sm text-neutral-400">Owner:</span> {hoveredHeader} </>
            :<> <span className="text-sm text-yellow-400">ManojTGN:</span> {header} </>}
        </p>
    </a>
}