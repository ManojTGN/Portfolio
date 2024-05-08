import { Octokit } from "octokit";
import { useEffect, useState } from "react";

export default function RepoContainer({ index, repoName, repoOwner }){
    
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState(null);

    useEffect(()=>{
        setLoading(true);
        const octokit = new Octokit({ auth: process.env.REPO_TOKEN });
        octokit.request('GET /repos/{owner}/{repo}', {
            owner: repoOwner!=null?repoOwner:"ManojTGN",
            repo: repoName,
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        }).then((response)=>{
            setTimeout(()=>setLoading(false),1000);
            if(response.status == 200) setData(response.data);
            else setData(undefined);
        }).catch((err)=>{setTimeout(()=>setLoading(false),2000);setData(undefined)});
    },[])

    if(loading){
        return(
        <div className={`w-full h-[250px] flex flex-col border border-neutral-800 bg-neutral-900 rounded-md p-2 overflow-hidden `}>
            <div className="h-1/2 w-full flex items-center">
                <div className="flex flex-col w-full gap-2">
                    <div className="w-full h-[18px] bg-neutral-500 rounded-sm animate-pulse"></div>
                    <div className="w-full h-[25px] bg-neutral-500 rounded-sm animate-pulse"></div>
                </div>
                <div className="w-1/2 flex items-center justify-end">
                    <div className="h-[40px] w-[40px] rounded-full bg-neutral-500"/>
                </div>
            </div>

            <p className="p-1 h-full text-neutral-300 py-3 overflow-hidden bg-neutral-500 rounded-sm animate-pulse"></p>
            
            <div className="h-2/6 flex items-center justify-start gap-4">
                <div className="flex items-center gap-1 text-neutral-300">
                    <i className="fa-solid fa-star"></i>
                    <p className="w-[30px] h-[25px] rounded-md bg-neutral-500 animate-pulse"></p>
                </div>

                <div className="flex items-center gap-1 text-neutral-300">
                    <i className="fa-solid fa-code-fork"></i>
                    <p className="w-[30px] h-[25px] rounded-md bg-neutral-500 animate-pulse"></p>
                </div>

                <div className="flex items-center gap-1 text-neutral-300">
                    
                </div>
                <div className="w-full flex items-center justify-end">
                    <i className="fa-brands fa-github fa-lg text-neutral-300"></i>
                </div>
            </div>
        </div>
        )
    }

    if(data === undefined) return <></>

    return (
        <a target="_blank" href={data.html_url} className={`w-full h-[250px] flex flex-col border border-neutral-800 hover:border-neutral-600 bg-neutral-900 hover:bg-neutral-800 rounded-md p-2 overflow-hidden group transition-all duration-0 `}>{/*'hover:relative hover:w-[310%]'+(index == 1?`hover:-left-[105%]`:index== 2?`hover:-left-[210%]`:``)*/}
            <div className="h-1/2 w-full flex items-center">
                <div className="flex flex-col">
                    <h1 className="text-lg text-neutral-600 font-mono font-bold">{data.owner.login}/</h1>
                    <p className="text-3xl text-neutral-300 font-mono font-bold truncate group-hover:underline">{data.name}</p>
                </div>
                {data.name.length < 15?
                <div className="w-full flex items-center justify-end">
                    <img src={data.owner.avatar_url} alt="github [PFP]" width="40" className="rounded-full" draggable="false"/>
                </div>:null}
            </div>

            <p className="p-1 h-[100px] text-neutral-500 py-3 overflow-hidden block">{data.description}</p>
            
            <div className="h-2/6 flex items-center justify-start gap-4">
                <div className="flex items-center gap-1 text-neutral-300">
                    <i className="fa-solid fa-star"></i>
                    <p>{data.stargazers_count}</p>
                </div>

                <div className="flex items-center gap-1 text-neutral-300">
                    <i className="fa-solid fa-code-fork"></i>
                    <p>{data.forks_count}</p>
                </div>

                <div className="flex items-center gap-1 text-neutral-300">
                    {data.topics.map((topic, index)=>{
                        return(
                            <div key={index} className="truncate p-1 bg-neutral-800 rounded-md text-neutral-200 hover:underline"> #{topic} </div>
                        )
                    })}
                </div>
                <div className="w-full flex items-center justify-end">
                    <i className="fa-brands fa-github fa-lg text-neutral-300"></i>
                </div>
            </div>
        </a>
    )
}
