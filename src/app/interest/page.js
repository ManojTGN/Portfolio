'use client'
import BattleContainer from "../components/battleContainerr";

export default function Page() {


    /*
     * 0 - https://www.reddit.com/r/PhotoshopRequest/comments/1ac64sf/comment/kjs8iye/ - Have fun with this one. Tipping the ones that make me laugh the most
     * 1 - https://www.reddit.com/r/photoshopbattles/comments/153wk4v/comment/jsoxlk9/ - a cat going thru hard times
     * 2 - https://www.reddit.com/r/photoshopbattles/comments/14ald27/comment/jobclya/ - dog positioned on the back of a couch 
     * 3 - https://www.reddit.com/r/photoshopbattles/comments/145yn8k/comment/jnnn549/ - Paddy Pimblett exercising 
     * 4 - https://www.reddit.com/r/photoshopbattles/comments/145km5w/comment/jnnjnin/ - [deleted by user] 
     * 5 - https://www.reddit.com/r/photoshopbattles/comments/102vln4/comment/j2wnwka/ - This person's view of a famous castle obscured by fog
     * 6 - https://www.reddit.com/r/photoshopbattles/comments/101b0wv/comment/j2ncy6z/ - Overweight Sphinx
     * 7 - https://www.reddit.com/r/photoshopbattles/comments/1015m0g/comment/j2mmsg6/ - a cat lying in front of a sunbeam
     * 8 - https://www.reddit.com/r/photoshopbattles/comments/10009sb/comment/j2gwkam/ - A cat cuddled up in a ball.
     * 9 - https://www.reddit.com/r/photoshopbattles/comments/zxbvy2/comment/j200smg/  - Cat in a hat in a box of oranges
     * 10- https://www.reddit.com/r/photoshopbattles/comments/zsmgl4/comment/j18nf4k/ - [deleted by user]
     * 11- https://www.reddit.com/r/photoshopbattles/comments/zsf9jw/comment/j18l5b6/ - Joe Biden and Zelenskyy
     * 12- https://www.reddit.com/r/photoshopbattles/comments/zrr5y3/comment/j15hy3g/ - Salt Bae with the World Cup Trophy
     * 13- https://www.reddit.com/r/PhotoshopRequest/comments/sk3pqd/comment/hvk7kwx/ - Please photoshop different instruments, guns, or other silly things into my 2 week old baby's hands.
     * 14- https://www.reddit.com/r/photoshopbattles/comments/s5eudi/comment/hsx5jb2/ - Guy in the snow
     * 15- https://www.reddit.com/r/photoshopbattles/comments/s4o0t4/comment/hss8oxl/ - Half-male/Half-female Cardinal
     * 16- https://www.reddit.com/r/photoshopbattles/comments/s45ohm/comment/hss5nd6/ - Half awake cat.
     * 17- https://www.reddit.com/r/photoshopbattles/comments/s40ipf/comment/hss2feo/ - This man with a giant puffball mushroom
     * 18- https://www.reddit.com/r/photoshopbattles/comments/s15sd4/comment/hsif461/ - This kid with a long stick
     * 19- https://www.reddit.com/r/photoshopbattles/comments/s2zirz/comment/hsi5m70/ - Chihuahua in pajamas on Range Rover
     * 20-  - 
     * 21-  - 
     * 22-  - 
     */

    return (
    <div className="w-full h-full flex flex-col items-center my-5">
        <div className="h-full w-9/12 flex flex-col gap-3">

            <div className="w-full flex flex-col gap-8 relative">
                <div className="w-full flex flex-col gap-2 sticky top-1 bg-neutral-950">

                    <div className="w-full flex flex-col items-start gap-2 justify-start py-2">
                        <a target="_self" href="../" className="px-3 py-1 text-neutral-300 bg-neutral-900 hover:bg-neutral-700 rounded text-sm">
                            <i className="fa-regular fa-hand-point-left"></i> Back To Portfolio
                        </a>
                        <hr className="w-full border border-neutral-700" />
                    </div>
                
                    <div className="flex gap-5 bg-neutral-950">
                        <div className="w-2/6">
                            <img src="/stamp_00.png" alt="Stamp 00" className="w-full rounded-md text-neutral-600 text-2xl text-center" draggable={false}/>
                        </div>

                        <div>
                            <h1 className="text-5xl text-yellow-300 font-bold">Photoshop Battle</h1>
                            <p className="text-white w-full">
                                Photoshop contests on reddit. A place to battle using image manipulation software, play photoshop tennis, create new images from old photos, or even win reddit gold.
                            </p>
                            <br/>

                            <div className="text-white border-2 rounded-md p-3 my-2 border-yellow-200 w-full">
                                <p className="text-yellow-300 font-bold">
                                    <i className="fa-solid fa-wand-magic-sparkles fa-lg text-yellow-300"></i> Note:
                                </p>
                                <p className="text-yellow-50 indent-8 ">
                                    The Viewing Pictures Are The Edited Output Pictures With A Caption Done By Myself And When Hovering, It Shows The Original Unedited
                                    Picture With The Owner Caption In It. 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-neutral-950 h-10">

                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-2 grid-flow-row gap-3">
                        <div className="flex flex-col gap-4">
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Joe Biden and Zelenskyy"}                header={"Me And My Friend After Finding A Village"}          link={"https://www.reddit.com/r/photoshopbattles/comments/zsf9jw/comment/j18l5b6/"} image={"photoshopbattle/11.jpeg"} hoverImage={"photoshopbattle/_11.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Guy in the snow"}                        header={"The Exact Same Pose -gta san"}                      link={"https://www.reddit.com/r/photoshopbattles/comments/s5eudi/comment/hsx5jb2/"} image={"photoshopbattle/14.jpeg"} hoverImage={"photoshopbattle/_14.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"A cat going thru hard times"}            header={"Assassin'sCreed - Where The Heck Is The HayStack?"} link={"https://www.reddit.com/r/photoshopbattles/comments/153wk4v/comment/jsoxlk9/"} image={"photoshopbattle/1.jpeg"} hoverImage={"photoshopbattle/_1.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Salt Bae with the World Cup Trophy"}     header={"Need IceCream?"}                                    link={"https://www.reddit.com/r/photoshopbattles/comments/zrr5y3/comment/j15hy3g/"} image={"photoshopbattle/12.jpeg"} hoverImage={"photoshopbattle/_12.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Dog positioned on the back of a couch"}  header={"Scooby Dooby Dooooo...."}                           link={"https://www.reddit.com/r/photoshopbattles/comments/14ald27/comment/jobclya/"} image={"photoshopbattle/2.jpeg"} hoverImage={"photoshopbattle/_2.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Cat in a hat in a box of oranges"}       header={"(It Movie): Look, it’s all connected by the sewers. That’s where IT lives!"} link={"https://www.reddit.com/r/photoshopbattles/comments/zxbvy2/comment/j200smg/"} image={"photoshopbattle/9.jpeg"} hoverImage={"photoshopbattle/_9.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Please photoshop different instruments, guns, or other silly things into my 2 week old baby's hands."} header={"Here Comes Our Baby Tarzan"} link={"https://www.reddit.com/r/PhotoshopRequest/comments/sk3pqd/comment/hvk7kwx/"} image={"photoshopbattle/13.png"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"A cat cuddled up in a ball."}            header={"Call me Cat America"}                               link={"https://www.reddit.com/r/photoshopbattles/comments/10009sb/comment/j2gwkam/"} image={"photoshopbattle/8.jpeg"} hoverImage={"photoshopbattle/_8.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"A cat lying in front of a sunbeam"}      header={"When Harry Potter Director Found This"}             link={"https://www.reddit.com/r/photoshopbattles/comments/1015m0g/comment/j2mmsg6/"} image={"photoshopbattle/7.jpeg"} hoverImage={"photoshopbattle/_7.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Chihuahua in pajamas on Range Rover"}    header={"https://imgur.com/a/wNGu3dc"}                       link={"https://www.reddit.com/r/photoshopbattles/comments/s2zirz/comment/hsi5m70/"} image={"photoshopbattle/19.jpeg"} hoverImage={"photoshopbattle/_19.jpg"} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Have fun with this one"}                 header={"- Ah Sh*t Here We Go Again..."}                     link={"https://www.reddit.com/r/PhotoshopRequest/comments/1ac64sf/comment/kjs8iye/"} image={"photoshopbattle/0.webp"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Overweight Sphinx"}                      header={"character creation *cyberpunk 2077*"}               link={"https://www.reddit.com/r/photoshopbattles/comments/101b0wv/comment/j2ncy6z/"} image={"photoshopbattle/6.jpeg"} hoverImage={"photoshopbattle/_6.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"This kid with a long stick"}             header={"Battling With BabyZombie -Minecraft"}               link={"https://www.reddit.com/r/photoshopbattles/comments/s15sd4/comment/hsif461/"} image={"photoshopbattle/18.jpeg"} hoverImage={"photoshopbattle/_18.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Paddy Pimblett exercising "}             header={"move it aside"}                                     link={"https://www.reddit.com/r/photoshopbattles/comments/145yn8k/comment/jnnn549/"} image={"photoshopbattle/3.jpeg"} hoverImage={"photoshopbattle/_3.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Half-male/Half-female Cardinal"}         header={"Dropped The IceCream On Hand 💔"}                   link={"https://www.reddit.com/r/photoshopbattles/comments/s4o0t4/comment/hss8oxl/"} image={"photoshopbattle/15.jpeg"} hoverImage={"photoshopbattle/_15.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"[deleted by user]"}                      header={"In A Parallel Universe"}                            link={"https://www.reddit.com/r/photoshopbattles/comments/zsmgl4/comment/j18nf4k/"} image={"photoshopbattle/10.jpeg"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"This person's view of a famous castle obscured by fog"} header={"I Took My Nooby Friend For Mining And He Is Hating Me 💖"} link={"https://www.reddit.com/r/photoshopbattles/comments/102vln4/comment/j2wnwka/"} image={"photoshopbattle/5.jpeg"} hoverImage={"photoshopbattle/_5.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Half awake cat."}                        header={"Yoda Cat -starwars"}                                link={"https://www.reddit.com/r/photoshopbattles/comments/s45ohm/comment/hss5nd6/"} image={"photoshopbattle/16.jpeg"} hoverImage={"photoshopbattle/_16.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"[deleted by user] "}                     header={"My Leg Hurts -Floor Is Lava"}                       link={"https://www.reddit.com/r/photoshopbattles/comments/145km5w/comment/jnnjnin/"} image={"photoshopbattle/4.jpeg"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"This man with a giant puffball mushroom"} header={"giant puffball mushroom with a man head"}          link={"https://www.reddit.com/r/photoshopbattles/comments/s40ipf/comment/hss2feo/"} image={"photoshopbattle/17.jpeg"} hoverImage={"photoshopbattle/_17.jpg"} />
                        </div>
                    </div>

                </div>
            </div>

            <hr className="border border-neutral-700" />
            <div className="w-full flex flex-row gap-8 relative">
                <div className="w-2/6">
                    <br/><br/>
                    <img src="/stamp_01.png" alt="Stamp 01" className="w-full sticky top-0 rounded-md text-neutral-600 text-2xl text-center" draggable={false}/>
                </div>
                <div className="w-full relative">
                    <div className="sticky top-0 bg-neutral-950">
                    <br/>
                    <h1 className="text-5xl text-yellow-300 font-bold">Photoshop Mail</h1>
                    <p className="text-white w-full">
                        Photoshop contests on reddit. A place to battle using image manipulation software, play photoshop tennis, create new images from old photos, or even win reddit gold.
                    </p>
                    <br/>
                    <div className="text-white border-2 rounded-md p-3 my-2 border-yellow-200 w-full">
                        <p className="text-yellow-300 font-bold">
                            <i className="fa-solid fa-wand-magic-sparkles fa-lg text-yellow-300"></i> Note:
                        </p>
                        <p className="text-yellow-50 indent-8 ">
                            The Viewing Pictures Are The Edited Output Pictures With A Caption Done By Myself And When Hovering, It Shows The Original Unedited
                            Picture With The Owner Caption In It. 
                        </p>
                    </div>
                    </div>

                    <br/>
                    <div className="grid grid-cols-2 grid-flow-row gap-3">
                        <div className="flex flex-col gap-4">
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Joe Biden and Zelenskyy"}                header={"Me And My Friend After Finding A Village"}          link={"https://www.reddit.com/r/photoshopbattles/comments/zsf9jw/comment/j18l5b6/"} image={"photoshopbattle/11.jpeg"} hoverImage={"photoshopbattle/_11.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Guy in the snow"}                        header={"The Exact Same Pose -gta san"}                      link={"https://www.reddit.com/r/photoshopbattles/comments/s5eudi/comment/hsx5jb2/"} image={"photoshopbattle/14.jpeg"} hoverImage={"photoshopbattle/_14.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"A cat going thru hard times"}            header={"Assassin'sCreed - Where The Heck Is The HayStack?"} link={"https://www.reddit.com/r/photoshopbattles/comments/153wk4v/comment/jsoxlk9/"} image={"photoshopbattle/1.jpeg"} hoverImage={"photoshopbattle/_1.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Salt Bae with the World Cup Trophy"}     header={"Need IceCream?"}                                    link={"https://www.reddit.com/r/photoshopbattles/comments/zrr5y3/comment/j15hy3g/"} image={"photoshopbattle/12.jpeg"} hoverImage={"photoshopbattle/_12.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Dog positioned on the back of a couch"}  header={"Scooby Dooby Dooooo...."}                           link={"https://www.reddit.com/r/photoshopbattles/comments/14ald27/comment/jobclya/"} image={"photoshopbattle/2.jpeg"} hoverImage={"photoshopbattle/_2.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Cat in a hat in a box of oranges"}       header={"(It Movie): Look, it’s all connected by the sewers. That’s where IT lives!"} link={"https://www.reddit.com/r/photoshopbattles/comments/zxbvy2/comment/j200smg/"} image={"photoshopbattle/9.jpeg"} hoverImage={"photoshopbattle/_9.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Please photoshop different instruments, guns, or other silly things into my 2 week old baby's hands."} header={"Here Comes Our Baby Tarzan"} link={"https://www.reddit.com/r/PhotoshopRequest/comments/sk3pqd/comment/hvk7kwx/"} image={"photoshopbattle/13.png"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"A cat cuddled up in a ball."}            header={"Call me Cat America"}                               link={"https://www.reddit.com/r/photoshopbattles/comments/10009sb/comment/j2gwkam/"} image={"photoshopbattle/8.jpeg"} hoverImage={"photoshopbattle/_8.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"A cat lying in front of a sunbeam"}      header={"When Harry Potter Director Found This"}             link={"https://www.reddit.com/r/photoshopbattles/comments/1015m0g/comment/j2mmsg6/"} image={"photoshopbattle/7.jpeg"} hoverImage={"photoshopbattle/_7.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Chihuahua in pajamas on Range Rover"}    header={"https://imgur.com/a/wNGu3dc"}                       link={"https://www.reddit.com/r/photoshopbattles/comments/s2zirz/comment/hsi5m70/"} image={"photoshopbattle/19.jpeg"} hoverImage={"photoshopbattle/_19.jpg"} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Have fun with this one"}                 header={"- Ah Sh*t Here We Go Again..."}                     link={"https://www.reddit.com/r/PhotoshopRequest/comments/1ac64sf/comment/kjs8iye/"} image={"photoshopbattle/0.webp"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Overweight Sphinx"}                      header={"character creation *cyberpunk 2077*"}               link={"https://www.reddit.com/r/photoshopbattles/comments/101b0wv/comment/j2ncy6z/"} image={"photoshopbattle/6.jpeg"} hoverImage={"photoshopbattle/_6.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"This kid with a long stick"}             header={"Battling With BabyZombie -Minecraft"}               link={"https://www.reddit.com/r/photoshopbattles/comments/s15sd4/comment/hsif461/"} image={"photoshopbattle/18.jpeg"} hoverImage={"photoshopbattle/_18.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Paddy Pimblett exercising "}             header={"move it aside"}                                     link={"https://www.reddit.com/r/photoshopbattles/comments/145yn8k/comment/jnnn549/"} image={"photoshopbattle/3.jpeg"} hoverImage={"photoshopbattle/_3.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Half-male/Half-female Cardinal"}         header={"Dropped The IceCream On Hand 💔"}                   link={"https://www.reddit.com/r/photoshopbattles/comments/s4o0t4/comment/hss8oxl/"} image={"photoshopbattle/15.jpeg"} hoverImage={"photoshopbattle/_15.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"[deleted by user]"}                      header={"In A Parallel Universe"}                            link={"https://www.reddit.com/r/photoshopbattles/comments/zsmgl4/comment/j18nf4k/"} image={"photoshopbattle/10.jpeg"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"This person's view of a famous castle obscured by fog"} header={"I Took My Nooby Friend For Mining And He Is Hating Me 💖"} link={"https://www.reddit.com/r/photoshopbattles/comments/102vln4/comment/j2wnwka/"} image={"photoshopbattle/5.jpeg"} hoverImage={"photoshopbattle/_5.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"Half awake cat."}                        header={"Yoda Cat -starwars"}                                link={"https://www.reddit.com/r/photoshopbattles/comments/s45ohm/comment/hss5nd6/"} image={"photoshopbattle/16.jpeg"} hoverImage={"photoshopbattle/_16.jpg"} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"[deleted by user] "}                     header={"My Leg Hurts -Floor Is Lava"}                       link={"https://www.reddit.com/r/photoshopbattles/comments/145km5w/comment/jnnjnin/"} image={"photoshopbattle/4.jpeg"} hoverImage={null} />
                            <BattleContainer className={"col-span-2"} hoveredHeader={"This man with a giant puffball mushroom"} header={"giant puffball mushroom with a man head"}          link={"https://www.reddit.com/r/photoshopbattles/comments/s40ipf/comment/hss2feo/"} image={"photoshopbattle/17.jpeg"} hoverImage={"photoshopbattle/_17.jpg"} />
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    </div>
    )
}
