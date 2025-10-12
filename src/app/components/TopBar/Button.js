'use client'
import { useRef } from 'react';

export default function Button({ name, iconClassName }){
    const buttonRef = useRef(null);

    function changePage(){
        const otherButton = document.getElementsByClassName("topbar-button");
        for(let i = 0; i < otherButton.length; i++){
            let element = otherButton.item(i);
            element.classList.remove("text-underline");
            element.classList.remove("text-blue-400");
            element.classList.add("hover:border-b-2");
        }

        buttonRef.current.classList.add("text-underline");
        buttonRef.current.classList.add("text-blue-400");
        buttonRef.current.classList.remove("hover:border-b-2");
    }

    return <>
        <button ref={buttonRef} onClick={changePage} tabIndex={0} className="topbar-button hover:border-b-2 border-white p-1 px-3 duration-75 relative">
            <span className="text-xl select-none"> {name} </span>
        </button>
    </>
}