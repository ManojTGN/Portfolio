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
    const [subscriberCount, setSubscriberCount] = useState(null);

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
                        setSubscriberCount(subs);
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
                <div className="w-11/12 md:w-9/12 lg:w-6/12 flex flex-col">
                    <Topbar />
                    <hr className="w-full mt-5 border-portfolio-500" />

                    <div className="relative w-full flex items-center justify-end mt-12 z-10">
                        <div className="h-12 text-2xl text-portfolio-500 flex items-center justify-end gap-5 fixed bg-portfolio-950 px-5 rounded-lg">
                            <i tabIndex={0} className={`fa-solid fa-table-cells ${view === 'LARGE' ? 'text-portfolio-50' : 'cursor-pointer'}`} onClick={() => setView('LARGE')}></i>
                            <i tabIndex={0} className={`fa-solid fa-grip-vertical ${view === 'MEDIUM' ? 'text-portfolio-50' : 'cursor-pointer'}`} onClick={() => setView('MEDIUM')}></i>
                            <i tabIndex={0} className={`fa-solid fa-bars ${view === 'COMPACT' ? 'text-portfolio-50' : 'cursor-pointer'}`} onClick={() => setView('COMPACT')}></i>
                        </div>
                    </div>

                    <a href="#product" className="text-3xl md:text-5xl font-medium" id="product">{t('portfolio.work.project.package')}</a>
                    {view === "LARGE" ?
                        <>
                            <a href="/work/grievanceForum">
                                <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/work/project/grievanceForum/GrievanceForum.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.grievanceforum.desc.short')}</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={true} images={["/images/work/project/grievanceForum/preview_0.jpg", "/images/work/project/grievanceForum/preview_1.jpg", "/images/work/project/grievanceForum/preview_2.jpg", "/images/work/project/grievanceForum/preview_3.jpg", "/images/work/project/grievanceForum/preview_4.jpg", "/images/work/project/grievanceForum/preview_5.jpg"]} />
                            </div>
                            <a href="/work/grievanceForum">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.grievanceforum.desc.long')}</p>
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>{t('portfolio.work.tags.web_product')}</span>
                                        <span>{t('portfolio.work.tags.mobile_compatibility')}</span>
                                        <span>{t('portfolio.work.tags.nodejs')}</span>
                                        <span>{t('portfolio.work.tags.expressjs')}</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500 flex flex-col xl:flex-row gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={true} images={["/images/work/project/grievanceForum/preview_0.jpg", "/images/work/project/grievanceForum/preview_1.jpg", "/images/work/project/grievanceForum/preview_2.jpg", "/images/work/project/grievanceForum/preview_3.jpg", "/images/work/project/grievanceForum/preview_4.jpg", "/images/work/project/grievanceForum/preview_5.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/grievanceForum">
                                            <Image src={"/images/work/project/grievanceForum/GrievanceForum.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.grievanceforum.desc.short')}</p>

                                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.grievanceforum.desc.long')}</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>{t('portfolio.work.tags.web_product')}</span>
                                                <span>{t('portfolio.work.tags.mobile_compatibility')}</span>
                                                <span>{t('portfolio.work.tags.nodejs')}</span>
                                                <span>{t('portfolio.work.tags.expressjs')}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/grievanceForum">
                                    <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/work/project/grievanceForum/GrievanceForum.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.grievanceforum.desc.short')}</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/cGrafix">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/work/project/cGrafix/cGrafix.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.cgrafix.desc')}</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={true} images={["/images/work/project/cGrafix/preview_0.jpg", "/images/work/project/cGrafix/preview_1.jpg", "/images/work/project/cGrafix/preview_2.jpg"]} />
                            </div>
                            <a href="/work/cGrafix">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>{t('portfolio.work.tags.library')}</span>
                                        <span>{t('portfolio.work.tags.pure_c')}</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex flex-col xl:flex-row gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={true} images={["/images/work/project/cGrafix/preview_0.jpg", "/images/work/project/cGrafix/preview_1.jpg", "/images/work/project/cGrafix/preview_2.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/cGrafix">
                                            <Image src={"/images/work/project/cGrafix/cGrafix.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.cgrafix.desc')}</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>{t('portfolio.work.tags.library')}</span>
                                                <span>{t('portfolio.work.tags.pure_c')}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/cGrafix">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/work/project/cGrafix/cGrafix.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.cgrafix.desc')}</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/asciiCam">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/work/project/asciiCam/asciicam.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.asciicam.desc')}</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={false} images={["/images/work/noPreview.jpg"]} />
                            </div>
                            <a href="/work/asciiCam">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>{t('portfolio.work.tags.opencv')}</span>
                                        <span>{t('portfolio.work.tags.cpp')}</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex flex-col xl:flex-row gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={false} images={["/images/work/noPreview.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/asciiCam">
                                            <Image src={"/images/work/project/asciiCam/asciicam.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.asciicam.desc')}</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>{t('portfolio.work.tags.opencv')}</span>
                                                <span>{t('portfolio.work.tags.cpp')}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/asciiCam">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/work/project/asciiCam/asciicam.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.asciicam.desc')}</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/collision2Djs">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/work/project/collision2Djs/collision2Djs.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.collision2djs.desc')}</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel images={["/images/work/project/collision2Djs/preview_0.jpg", "/images/work/project/collision2Djs/preview_1.jpg", "/images/work/project/collision2Djs/preview_2.jpg"]} />
                            </div>
                            <a href="/work/collision2Djs">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>{t('portfolio.work.tags.javascript')}</span>
                                        <span>{t('portfolio.work.tags.nodejs')}</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex flex-col xl:flex-row gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel images={["/images/work/project/collision2Djs/preview_0.jpg", "/images/work/project/collision2Djs/preview_1.jpg", "/images/work/project/collision2Djs/preview_2.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/collision2Djs">
                                            <Image src={"/images/work/project/collision2Djs/collision2Djs.png"} alt={""} draggable="false" width={"1080"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.collision2djs.desc')}</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>{t('portfolio.work.tags.javascript')}</span>
                                                <span>{t('portfolio.work.tags.nodejs')}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/collision2Djs">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/work/project/collision2Djs/collision2Djs.png"} alt={""} draggable="false" width={"600"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.collision2djs.desc')}</p>
                                    </div>
                                </a>
                            </>
                    }

                    {view === "LARGE" ?
                        <>
                            <a href="/work/asciiTable">
                                <div className="border-l-2 pl-5 mt-32 border-portfolio-500 dark:border-portfolio-500">
                                    <Image src={"/images/work/project/asciiTable/asciitable.png"} alt={""} draggable="false" width={"480"} height={"200"} />
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.asciitable.desc')}</p>
                                </div>
                            </a>
                            <div className="aspect-video border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                <Carousel showArrow={true} images={["/images/work/project/asciiTable/preview_0.jpg", "/images/work/project/asciiTable/preview_1.jpg", "/images/work/project/asciiTable/preview_2.jpg"]} />
                            </div>
                            <a href="/work/asciiTable">
                                <div className="border-l-2 pl-5 pt-3 border-portfolio-500 dark:border-portfolio-500">
                                    <div className="flex gap-5 text-portfolio-500 pt-3 font-semibold text-lg">
                                        <span className="text-portfolio-50 font-medium">Tags:</span>
                                        <span>{t('portfolio.work.tags.terminal')}</span>
                                        <span>{t('portfolio.work.tags.pure_c')}</span>
                                    </div>
                                </div>
                            </a>
                        </>
                        : view === "MEDIUM" ?
                            <>
                                <div className="border-l-2 pl-5 mt-16 border-portfolio-500 dark:border-portfolio-500 flex flex-col xl:flex-row gap-5">
                                    <div className="w-full aspect-video">
                                        <Carousel showArrow={true} images={["/images/work/project/asciiTable/preview_0.jpg", "/images/work/project/asciiTable/preview_1.jpg", "/images/work/project/asciiTable/preview_2.jpg"]} />
                                    </div>
                                    <div className="w-full">
                                        <a href="/work/asciiTable">
                                            <Image src={"/images/work/project/asciiTable/asciitable.png"} alt={""} draggable="false" width={"280"} height={"200"} />
                                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.asciitable.desc')}</p>
                                            <div className="flex gap-3 text-portfolio-500 pt-3 font-semibold text-lg">
                                                <span className="text-portfolio-50 font-medium">Tags:</span>
                                                <span>{t('portfolio.work.tags.terminal')}</span>
                                                <span>{t('portfolio.work.tags.pure_c')}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <a href="/work/asciiTable">
                                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                                        <Image src={"/images/work/project/asciiTable/asciitable.png"} alt={""} draggable="false" width={"280"} height={"200"} />
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.asciitable.desc.short')}</p>
                                    </div>
                                </a>
                            </>
                    }

                    <div className="mt-8 pl-5 border-dashed border-l-2 border-portfolio-500 dark:border-portfolio-500">
                        <p className="dark:text-white font-medium text-lg">{t('portfolio.work.help.title')} </p>
                        <p className="text-portfolio-500 dark:text-portfolio-500">{t('portfolio.work.help.desc')}</p>
                        <p className="text-portfolio-500 dark:text-portfolio-500">{t('portfolio.work.help.contact')}  <a className="underline text-yellow-700 font-semibold" href="/#contact">{t('portfolio.work.help.come.say.hi')}</a></p>
                    </div>

                    <a href="#contentCreator" className="text-3xl md:text-5xl font-medium mt-16" id="contentCreator">{t('portfolio.work.content.creator')}</a>
                    <div className="w-full">
                        <div className="border-l-2 pl-5 mt-5 border-portfolio-500 dark:border-portfolio-500 flex flex-col gap-5">
                            <div className="w-full flex flex-col md:flex-row gap-4">
                                <div className="w-auto">
                                    <Image src={"/images/work/tamilgamersnetwork.jpg"} alt={""} draggable="false" width={"100"} height={"100"} />
                                </div>
                                <div className="w-auto text-start">
                                    <p className="text-portfolio-50 text-2xl font-medium">{t('portfolio.work.tgn.name')}</p>
                                    <a href="https://www.youtube.com/@TamilGamersNetworks/videos" target="_blank" className="text-red-500 text-lg"><i className="fa-brands fa-youtube text-red-500 text-lg"></i> {t('portfolio.work.tgn.content_creation')} <i className="fa-solid fa-up-right-from-square text-sm"></i></a>
                                    <p className="text-portfolio-500 text-lg">{subscriberCount ? `${subscriberCount} ${t('portfolio.work.subscribers')}` : t('portfolio.work.subscribers')}</p>
                                </div>
                                <div className="w-3/6">
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.tgn.desc')}</p>
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

                    <a href="#others" className="text-3xl md:text-5xl font-medium mt-16" id="others">{t('portfolio.work.others')}</a>
                    <div className="border-l-2 pl-5 mt-8 border-portfolio-500 dark:border-portfolio-500">
                        <p className="text-3xl font-semibold">{t('portfolio.work.photoshop.battle')}</p>
                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.photoshop.battle.desc')}</p>
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
                        <p className="text-3xl font-semibold">{t('portfolio.work.steam.guide')}</p>
                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.desc')}</p>
                        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2732039208" target="_blank" rel="noopener noreferrer">
                            <div className="flex gap-2 mt-5">
                                <Image src="/images/work/gameguide1.jpg" alt="" height={125} width={125} />
                                <div>
                                    <p className="text-portfolio-500 text-base font-medium"><i className="fa-solid fa-gamepad"></i> {t('portfolio.work.steam.guide.skyrim.game')}</p>
                                    <p className="text-2xl font-semibold">{t('portfolio.work.steam.guide.skyrim.title')}</p>
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.skyrim.desc1')}</p>
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.skyrim.desc2')}</p>
                                </div>
                            </div>
                        </a>
                        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3326170636" target="_blank" rel="noopener noreferrer">
                            <div className="flex gap-2 mt-5">
                                <Image src="/images/work/gameguide2.jpg" alt="" height={125} width={125} />
                                <div>
                                    <p className="text-portfolio-500 text-base font-medium"><i className="fa-solid fa-gamepad"></i> {t('portfolio.work.steam.guide.kcd.game')}</p>
                                    <p className="text-2xl font-semibold">{t('portfolio.work.steam.guide.kcd.title')}</p>
                                    <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.kcd.desc')}</p>
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
