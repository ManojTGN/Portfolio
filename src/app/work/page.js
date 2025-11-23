'use client'

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Image from "next/image";
import ImageDiff from "../components/ImageDiff";

export default function Work() {
    const { t, i18n, ready } = useTranslation();
    const [view, setView] = useState(`MEDIUM`);
    const [videos, setVideos] = useState([]);
    const [subscriberCount, setSubscriberCount] = useState("Subscribers");

    useEffect(() => {
        const fetchYouTubeData = async () => {
            const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
            const CHANNEL_ID = 'UCIpx-ZquNHFjjODgW5_yroQ';
            if (!API_KEY) return;

            try {
                const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`);
                const channelData = await channelResponse.json();

                if (channelData.items && channelData.items.length > 0) {
                    const item = channelData.items[0];
                    let subs = item.statistics.subscriberCount;
                    if (subs) {
                        if (subs >= 1000000) {
                            subs = (subs / 1000000).toFixed(1) + 'M';
                        } else if (subs >= 1000) {
                            subs = (subs / 1000).toFixed(1) + 'K';
                        }
                        setSubscriberCount(`${subs} Subscribers`);
                    }

                    const uploadsPlaylistId = item.contentDetails.relatedPlaylists.uploads;
                    const videosResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=6&key=${API_KEY}`);
                    const videosData = await videosResponse.json();

                    if (videosData.items) {
                        const fetchedVideos = videosData.items.map(videoItem => ({
                            id: videoItem.snippet.resourceId.videoId,
                            title: videoItem.snippet.title,
                            link: `https://www.youtube.com/watch?v=${videoItem.snippet.resourceId.videoId}`,
                            thumbnail: videoItem.snippet.thumbnails.high?.url || videoItem.snippet.thumbnails.medium?.url,
                            published: videoItem.snippet.publishedAt
                        }));
                        setVideos(fetchedVideos);
                    }
                }
            } catch (error) {
                console.error("Error fetching YouTube data:", error);
            }
        };

        fetchYouTubeData();
    }, []);

    if (!ready) return <></>;
    return (
        <>
            <div className="w-full flex flex-col items-center justify-start">
                <div className="w-6/12 flex flex-col">
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500" />

                    <div className="relative w-full flex items-center justify-end mt-12 z-10">
                        <div className="h-12 text-2xl text-portfolio-500 flex items-center justify-end gap-5 fixed bg-portfolio-950 px-5 rounded-lg">
                            <i tabIndex={0} className={`fa-solid fa-table-cells ${view === 'LARGE' ? 'text-portfolio-50' : 'cursor-pointer'}`} onClick={() => setView('LARGE')}></i>
                            <i tabIndex={0} className={`fa-solid fa-grip-vertical ${view === 'MEDIUM' ? 'text-portfolio-50' : 'cursor-pointer'}`} onClick={() => setView('MEDIUM')}></i>
                            <i tabIndex={0} className={`fa-solid fa-bars ${view === 'COMPACT' ? 'text-portfolio-50' : 'cursor-pointer'}`} onClick={() => setView('COMPACT')}></i>
                        </div>
                    </div>

                    <a href="#product" className="text-5xl font-medium" id="product">Project & Package</a>
                    {view === "LARGE" ?
                        <>
                            <a href="/work/grievanceForum">
                                <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/GrievanceForum.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">A digital platform built to streamline how students and faculty raise, track, and resolve grievances within our college. It bridges communication gaps, ensures transparency, and empowers both students and administrators to act efficiently.</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={true} images={["/images/GrievanceForum1.jpg", "/images/GrievanceForum2.jpg", "/images/GrievanceForum3.jpg", "/images/GrievanceForum4.jpg", "/images/GrievanceForum5.jpg", "/images/GrievanceForum6.jpg"]} />
                            </div>
                            <a href="/work/grievanceForum">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <p className="text-portfolio-500 text-lg">Grievance Forum is a web-based system that allows students to submit issues and suggestions, while admins can review, categorize, and resolve them with proper tracking. This project was developed as part of our college initiative to promote a transparent and responsive grievance-handling system.</p>
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>Web Product</span>
                                        <span>Mobile Compatibility</span>
                                        <span>NodeJS</span>
                                        <span>ExpressJS</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500 flex gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={true} images={["/images/GrievanceForum1.jpg", "/images/GrievanceForum2.jpg", "/images/GrievanceForum3.jpg", "/images/GrievanceForum4.jpg", "/images/GrievanceForum5.jpg", "/images/GrievanceForum6.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/grievanceForum">
                                            <Image src={"/images/GrievanceForum.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">A digital platform built to streamline how students and faculty raise, track, and resolve grievances within our college. It bridges communication gaps, ensures transparency, and empowers both students and administrators to act efficiently.</p>

                                            <p className="text-portfolio-500 text-lg">Grievance Forum is a web-based system that allows students to submit issues and suggestions, while admins can review, categorize, and resolve them with proper tracking. This project was developed as part of our college initiative to promote a transparent and responsive grievance-handling system.</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>Web Product</span>
                                                <span>Mobile Compatibility</span>
                                                <span>NodeJS</span>
                                                <span>ExpressJS</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/grievanceForum">
                                    <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/GrievanceForum.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">A digital platform built to streamline how students and faculty raise, track, and resolve grievances within our college. It bridges communication gaps, ensures transparency, and empowers both students and administrators to act efficiently.</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/cGrafix">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/cGrafix.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">Cgrafix is a lightweight C graphics library that works only on Windows. It uses the native Windows API to render shapes, text, and visuals directly on the screen. No extra dependencies needed.</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={true} images={["/images/cGrafix1.jpg", "/images/cGrafix2.jpg", "/images/cGrafix3.jpg"]} />
                            </div>
                            <a href="/work/cGrafix">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>Library</span>
                                        <span>Pure C Programming</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={true} images={["/images/cGrafix1.jpg", "/images/cGrafix2.jpg", "/images/cGrafix3.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/cGrafix">
                                            <Image src={"/images/cGrafix.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">Cgrafix is a lightweight C graphics library that works only on Windows. It uses the native Windows API to render shapes, text, and visuals directly on the screen. No extra dependencies needed.</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>Library</span>
                                                <span>Pure C Programming</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/cGrafix">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/cGrafix.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">Cgrafix is a lightweight C graphics library that works only on Windows. It uses the native Windows API to render shapes, text, and visuals directly on the screen. No extra dependencies needed.</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/asciiCam">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/asciiCam.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">This C++ program captures frames from your webcam and converts them into ASCII art in real-time. and it will produce the output ascii art in the terminal. You can customize the output, change cameras, add your own ASCII characters, and more.</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={false} images={["/images/noPreview.jpg"]} />
                            </div>
                            <a href="/work/asciiCam">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>OpenCV</span>
                                        <span>C++ Programming</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={false} images={["/images/noPreview.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/asciiCam">
                                            <Image src={"/images/asciicam.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">This C++ program captures frames from your webcam and converts them into ASCII art in real-time. and it will produce the output ascii art in the terminal. You can customize the output, change cameras, add your own ASCII characters, and more.</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>OpenCV</span>
                                                <span>C++ Programming</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/asciiCam">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/asciicam.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">This C++ program captures frames from your webcam and converts them into ASCII art in real-time. and it will produce the output ascii art in the terminal. You can customize the output, change cameras, add your own ASCII characters, and more.</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/collision2Djs">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/collision2Djs.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">Collision2djs is a JavaScript library for efficient 2D collision detection. It supports common geometric shapes and offers both broad-phase and narrow-phase collision detection, making it ideal for building physics simulations, games, or interactive visualizations.</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={false} images={["/images/noPreview.jpg"]} />
                            </div>
                            <a href="/work/collision2Djs">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>JavaScript</span>
                                        <span>NodeJS</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={false} images={["/images/noPreview.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/collision2Djs">
                                            <Image src={"/images/collision2Djs.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">Collision2djs is a JavaScript library for efficient 2D collision detection. It supports common geometric shapes and offers both broad-phase and narrow-phase collision detection, making it ideal for building physics simulations, games, or interactive visualizations.</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>JavaScript</span>
                                                <span>NodeJS</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/collision2Djs">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/collision2Djs.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">Collision2djs is a JavaScript library for efficient 2D collision detection. It supports common geometric shapes and offers both broad-phase and narrow-phase collision detection, making it ideal for building physics simulations, games, or interactive visualizations.</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/asciiTable">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/asciitable.png"} alt={""} draggable="false" width={"480"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">AsciiTable is a lightweight C/C++ command-line tool that displays ASCII characters along with their decimal, hex, octal, and binary values. It supports filtering character groups, sorting output, colorized VT100 mode, and accepting inputs in multiple formats, making it a quick and customizable reference for developers working with ASCII and low-level text data.</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={true} images={["/images/asciiTable1.jpg", "/images/asciiTable2.jpg", "/images/asciiTable3.jpg"]} />
                            </div>
                            <a href="/work/asciiTable">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>Terminal</span>
                                        <span>Pure C Programming</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={true} images={["/images/asciiTable1.jpg", "/images/asciiTable2.jpg", "/images/asciiTable3.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/asciiTable">
                                            <Image src={"/images/asciitable.png"} alt={""} draggable="false" width={"280"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">AsciiTable is a lightweight C/C++ command-line tool that displays ASCII characters along with their decimal, hex, octal, and binary values. It supports filtering character groups, sorting output, colorized VT100 mode, and accepting inputs in multiple formats, making it a quick and customizable reference for developers working with ASCII and low-level text data.</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>Terminal</span>
                                                <span>Pure C Programming</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/asciiTable">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/asciitable.png"} alt={""} draggable="false" width={"280"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">AsciiTable shows octal, hexadecimal, decimal and binary representations of ascii characters. It supports all 8-bit(256) ASCII characters. But 7-bit(128) ASCII characters are prefered to be processed.</p>
                                    </div>
                                </a>
                            </>
                    }

                    <div className="mt-8 pl-5 border-dashed border-l-2 border-portfolio-500 dark:border-portfolio-500">
                        <p className="dark:text-white font-medium text-lg">Help Me Fill Up This Page! </p>
                        <p className="text-portfolio-500 dark:text-portfolio-500">This page is still growing. Got an idea, a spark, or a challenge? Lets build something that deserves a spot here. ⚡</p>
                        <p className="text-portfolio-500 dark:text-portfolio-500">The next big thing starts with a message  <a className="underline text-yellow-700 font-semibold" href="/#contact">Come Say Hi.</a></p>
                    </div>

                    <a href="#contentCreator" className="text-5xl font-medium mt-16" id="contentCreator">Content Creator</a>
                    <div className="w-full">
                        <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500 flex flex-col gap-5">
                            <div className="w-full flex gap-4">
                                <div className="w-auto">
                                    <Image src={"/images/tamilgamersnetwork.jpg"} alt={""} draggable="false" width={"100"} height={"100"} />
                                </div>
                                <div className="w-auto text-start">
                                    <p className="text-portfolio-50 text-2xl font-medium">Tamil Gamers Network</p>
                                    <a href="https://www.youtube.com/@TamilGamersNetworks/videos" target="_blank" className="text-red-500 text-lg"><i className="fa-brands fa-youtube text-red-500 text-lg"></i> Content Creation <i class="fa-solid fa-up-right-from-square text-sm"></i></a>
                                    <p className="text-portfolio-500 text-lg">{subscriberCount}</p>
                                </div>
                                <div className="w-3/6">
                                    <p className="text-portfolio-500 text-lg">Tamil Gamers Networks is a Tamil-language gaming channel that features entertaining gameplay videos, fun commentary, and creative story-style series especially Minecraft making it a friendly and engaging space for Tamil gaming fans.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {videos.map((video) => (
                                    <a key={video.id} href={video.link} target="_blank" rel="noopener noreferrer" className="block group">
                                        <div className="relative aspect-video w-full overflow-hidden border border-portfolio-500/30">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <i className="fa-brands fa-youtube text-red-600 text-4xl drop-shadow-lg"></i>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-portfolio-500 text-sm font-medium line-clamp-2 group-hover:text-portfolio-900 dark:group-hover:text-portfolio-100 transition-colors">
                                            {video.title}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a href="#others" className="text-5xl font-medium mt-16" id="others">Others</a>
                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                        <p className="text-3xl font-semibold">Photoshop Battle</p>
                        <p className="text-portfolio-500 text-lg">Photoshop Battles are creative online contests where users transform images in unique, humorous, or artistic ways. As an active participant in Reddit Photoshop Battles, I’ve earned multiple high-upvoted entries. I’m skilled in advanced photo manipulation, compositing, visual storytelling, and delivering fast, high-quality edits that stand out in competitive creative spaces.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_11.jpg" rightImageSrc="/images/photoshopBattle/11.jpeg" />
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_7.jpg" rightImageSrc="/images/photoshopBattle/7.jpeg" />
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_5.jpg" rightImageSrc="/images/photoshopBattle/5.jpeg" />
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_9.jpg" rightImageSrc="/images/photoshopBattle/9.jpeg" />
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_14.jpg" rightImageSrc="/images/photoshopBattle/14.jpeg" />
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_1.jpg" rightImageSrc="/images/photoshopBattle/1.jpeg" />
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_15.jpg" rightImageSrc="/images/photoshopBattle/15.jpeg" />
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_12.jpg" rightImageSrc="/images/photoshopBattle/12.jpeg" />
                            </div>

                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30">
                                <ImageDiff leftImageSrc="/images/photoshopBattle/_18.jpg" rightImageSrc="/images/photoshopBattle/18.jpeg" />
                            </div>
                        </div>
                    </div>
                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                        <p className="text-3xl font-semibold">Steam Game Guide</p>
                        <p className="text-portfolio-500 text-lg">A Steam Guide is a community-created walkthrough or reference that helps players understand a game, mechanic, or strategy through clear explanations, visuals, and tips. I create detailed Steam Guides that break down complex concepts in a simple, beginner-friendly way, focusing on clarity, usefulness, and good presentation. My guides are well-received in the community and reflect my ability to teach, simplify, and visually communicate information effectively.</p>
                        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2732039208" target="_blank" rel="noopener noreferrer">
                        <div className="flex gap-2 mt-5">
                            <Image src="/images/work/gameguide1.jpg" alt=""  height={125} width={125}/>
                            <div>
                                <p className="text-portfolio-500 text-base font-medium"><i className="fa-solid fa-gamepad"></i> The Elder Scrolls V: Skyrim Special Edition</p>
                                <p className="text-2xl font-semibold">Get Unlimited Gold Goldenhills Plantation</p>
                                <p className="text-portfolio-500 text-lg">💰Getting Unlimited Gold With Goldenhills Plantation Farm</p>
                                <p className="text-portfolio-500 text-lg">🏺Alchemy Level To 100</p>
                            </div>
                        </div>
                        </a>
                        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3326170636" target="_blank" rel="noopener noreferrer">
                        <div className="flex gap-2 mt-5">
                            <Image src="/images/work/gameguide2.jpg" alt=""  height={125} width={125}/>
                            <div>
                                <p className="text-portfolio-500 text-base font-medium"><i className="fa-solid fa-gamepad"></i> Kingdom Come Deliverance</p>
                                <p className="text-2xl font-semibold">How To Get Out of Castle Talmberg With Horse</p>
                                <p className="text-portfolio-500 text-lg">A lot of new players are dropping out before they even get the game going, so here's a quick guide on how to escape Talmberg Castle with a horse—no consequences, no hassle.</p>
                            </div>
                        </div>
                        </a>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
