import RepoContainer from "./repoContainer";

export default function projectsContainer(){
    return(
        <div className="w-full h-full flex flex-col rounded-md group/container">
            <div className="border-b border-neutral-700 p-2 flex gap-5 items-center">
                <h1 className="text-3xl text-neutral-300 flex items-center gap-2">
                    <i className="fa-regular fa-folder-closed fa-sm"></i>
                    <span>Projects</span>
                </h1>
                <p className="text-neutral-500 group-hover/container:opacity-100 opacity-0 transition-all"> Wanna See All My Projects?</p>
                <a target="_blank" href="https://github.com/ManojTGN?tab=repositories" className="px-3 py-1 text-neutral-300 bg-neutral-900 hover:bg-neutral-700 rounded text-sm group-hover/container:opacity-100 opacity-0 transition-all duration-200 group/link">
                    <i className="fa-solid fa-layer-group"></i> More Projects <i className="fa-solid fa-arrow-up-right-from-square opacity-0 -px-2 group-hover/link:opacity-100 group-hover/link:w-6 transition-all text-end w-0"></i>
                </a>
            </div>
            <div className="w-full h-full p-2 grid grid-rows-2 grid-cols-3 gap-4">
                <RepoContainer repoName={"cgrafix"} />
                <RepoContainer repoName={"hashmap"} repoOwner={"T-G-N"} />
                <RepoContainer repoName={"asciicam-cmd"} />
                <RepoContainer repoName={"collision2djs"} />
                <RepoContainer repoName={"GrievanceForum"} />
                <RepoContainer repoName={"ascii-table"} />
            </div>
        </div>
    )
}