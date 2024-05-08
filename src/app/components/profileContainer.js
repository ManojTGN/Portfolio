import Image from "next/image";

export default function ProfileContainer(){
    return (
        <div className="w-2/6 h-full rounded-md bg-neutral-900 backdrop-blur-lg border-2 border-neutral-800 flex flex-col">
            <div className="border-b border-neutral-700 p-2">
                <h1 className="flex items-center gap-3 w-full">
                    <p className="w-full text-3xl text-neutral-200"><i className="fa-regular fa-chess-king fa-sm"></i> Manoj A</p> 
                    <span className="text-lg text-neutral-600 text-end w-1/2">ManojTGN</span>
                </h1>
            </div>
            <div className="p-5 h-full flex flex-col gap-2">
            
            <img src="/real_me.jpeg" alt="⧆ Profile Picture" className="w-full rounded-md text-neutral-600 text-2xl text-center opacity-90" draggable={false}/>
            
            <div className="w-full h-full flex flex-col gap-2 py-5">
                <h1 className="flex items-center gap-2">
                    <i className="fa-solid fa-at fa-lg text-neutral-600"></i>
                    <a className="text-neutral-200 hover:underline" href="mailto:manojanguraja@gmail.com">ManojAngurajA@gmail.com</a>
                </h1>
                
                <h1 className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot fa-lg text-neutral-600"></i>
                    <span className="text-neutral-200">TamilNadu, India</span>
                </h1>

                <h1 className="flex items-center gap-2">
                    <i className="fa-solid fa-cake-candles fa-lg text-neutral-600"></i>
                    <span className="text-neutral-200"> 31 / 10 / 2002</span>
                </h1>

                <br/>

                <h1 className="flex items-center gap-2">
                    <i className="fa-brands fa-github fa-lg text-neutral-600"></i>
                    <a className="text-neutral-200 hover:underline flex gap-1 items-center group" href="https://github.com/manojTGN" target="_blank">
                        <span><span className="font-bold">Github/</span>ManojTGN</span>
                        <i className="fa-solid fa-arrow-up-right-from-square -px-2 group-hover:px-2 group-hover:opacity-100 opacity-0 transition-all"></i>
                    </a>
                </h1>

                <h1 className="flex items-center gap-2">
                    <i className="fa-brands fa-linkedin fa-lg text-neutral-600"></i>
                    <a className="text-neutral-200 hover:underline flex gap-1 items-center group" href="https://www.linkedin.com/in/manojbit/" target="_blank">
                        <span><span className="font-bold">LinkedIn/</span>ManojBIT</span>
                        <i className="fa-solid fa-arrow-up-right-from-square -px-2 group-hover:px-2 group-hover:opacity-100 opacity-0 transition-all"></i>
                    </a>
                </h1>

                <h1 className="flex items-center gap-2">
                    <i className="fa-brands fa-instagram text-neutral-600"></i>
                    <a className="text-neutral-200 hover:underline flex gap-1 items-center group" href="https://www.instagram.com/_m4n0j_/" target="_blank">
                        <span><span className="font-bold">Instagram/</span>_m4n0j_</span>
                        <i className="fa-solid fa-arrow-up-right-from-square -px-2 group-hover:px-2 group-hover:opacity-100 opacity-0 transition-all"></i>
                    </a>
                </h1>
            </div>

            {/* <hr className="border rounded-full border-neutral-700 opacity-70" />

            <div className="flex flex-col gap-2">
                <h1 className="flex items-center gap-2">
                    <i className="fa-solid fa-signature fa-lg text-neutral-600"></i>
                    <span className="text-neutral-200">Favourite Quote</span>
                </h1>
                <p className="text-neutral-700 flex flex-col gap-2">
                    <span>Never ever ever ever ever giveup</span>
                    <span className="text-end text-neutral-500">― Winston Churchill</span>
                </p>
            </div> */}

            </div>
        </div>
    )
}