'use client'

export default function Button({ name, iconClassName }){
    return <>
        <button tabIndex={0} className="
        border rounded-xl p-4 px-9 w-full hover:border-4 duration-75
        text-start flex gap-6
        dark:bg-stone-950 dark:border-stone-900
        dark:text-neutral-400
        ">
            <i className={iconClassName}></i>
            <span className="text-3xl"> {name} </span>
        </button>
    </>
}