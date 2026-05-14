'use client'

import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";

import Topbar from "../components/Topbar";
import FixedTopbar from "../components/FixedTopbar";
import Footer from "../components/Footer";
import Image from "next/image";
import ImageDiff from "../components/ImageDiff";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "@/app/lib/projects";

const PHOTOSHOP_BATTLES = [
    { left: '/images/photoshopBattle/_11.jpg', right: '/images/photoshopBattle/11.jpeg' },
    { left: '/images/photoshopBattle/_7.jpg', right: '/images/photoshopBattle/7.jpeg' },
    { left: '/images/photoshopBattle/_5.jpg', right: '/images/photoshopBattle/5.jpeg' },
    { left: '/images/photoshopBattle/_9.jpg', right: '/images/photoshopBattle/9.jpeg' },
    { left: '/images/photoshopBattle/_14.jpg', right: '/images/photoshopBattle/14.jpeg' },
    { left: '/images/photoshopBattle/_1.jpg', right: '/images/photoshopBattle/1.jpeg' },
    { left: '/images/photoshopBattle/_15.jpg', right: '/images/photoshopBattle/15.jpeg' },
    { left: '/images/photoshopBattle/_12.jpg', right: '/images/photoshopBattle/12.jpeg' },
    { left: '/images/photoshopBattle/_18.jpg', right: '/images/photoshopBattle/18.jpeg' },
];

export default function WorkClient() {
    const { t, ready } = useTranslation();
    const [view, setView] = useState('COMPACT');
    const [videos, setVideos] = useState([]);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [previewIndex, setPreviewIndex] = useState(null);

    const battleButtonRefs = useRef([]);
    const closeButtonRef = useRef(null);
    const lastOpenedIndexRef = useRef(null);

    const openPreview = useCallback((index) => {
        lastOpenedIndexRef.current = index;
        setPreviewIndex(index);
    }, []);

    const closePreview = useCallback(() => {
        setPreviewIndex(null);
    }, []);

    const prevPreview = useCallback(() => setPreviewIndex(i => (i - 1 + PHOTOSHOP_BATTLES.length) % PHOTOSHOP_BATTLES.length), []);
    const nextPreview = useCallback(() => setPreviewIndex(i => (i + 1) % PHOTOSHOP_BATTLES.length), []);

    useEffect(() => {
        if (previewIndex === null) {
            if (lastOpenedIndexRef.current !== null) {
                const btn = battleButtonRefs.current[lastOpenedIndexRef.current];
                if (btn) btn.focus();
            }
            return;
        }

        if (closeButtonRef.current) closeButtonRef.current.focus();

        const handleKey = (e) => {
            if (e.key === 'Escape') closePreview();
            if (e.key === 'ArrowLeft') prevPreview();
            if (e.key === 'ArrowRight') nextPreview();

            if (e.key === 'Tab') {
                const dialog = document.getElementById('preview-dialog');
                if (!dialog) return;

                const focusable = dialog.querySelectorAll('button, [tabindex="0"]');
                if (focusable.length === 0) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [previewIndex, closePreview, prevPreview, nextPreview]);

    useEffect(() => {
        const fetchYouTubeData = async () => {
            try {
                const res = await fetch('/api/youtube');
                if (!res.ok) return;

                const data = await res.json();
                if (data.videos) setVideos(data.videos);
                if (data.subscriberCount) setSubscriberCount(data.subscriberCount);
            } catch (error) {
                console.error("Error fetching YouTube data:", error);
            }
        };

        fetchYouTubeData();
    }, []);

    if (!ready) return null;

    return (
        <>
            <div className="w-full flex flex-col items-center justify-start">
                <FixedTopbar triggerOffset={100} />
                <div className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-[70%] max-w-[1400px] flex flex-col">
                    <Topbar />
                    <main id="main-content">
                    <div className="wavy-line w-full mt-5 bg-portfolio-950 dark:bg-portfolio-500" aria-hidden="true"></div>

                    <section aria-labelledby="product-heading">
                        <div id="modeSelector" className="sticky top-20 md:top-24 z-30 w-full flex items-center justify-end mt-12">
                            <div className="h-12 text-2xl text-portfolio-500 flex items-center justify-end gap-5 dark:bg-portfolio-950 bg-portfolio-50 px-5 rounded-lg" role="toolbar" aria-label="View mode">
                                <button onClick={() => setView('MEDIUM')} aria-label="Medium view" aria-pressed={view === 'MEDIUM'} className={view === 'MEDIUM' ? 'dark:text-portfolio-50 text-portfolio-950' : ' dark:text-portfolio-500 text-portfolio-800 cursor-pointer'}>
                                    <i className="fa-solid fa-grip-vertical" aria-hidden="true"></i>
                                </button>
                                <button onClick={() => setView('COMPACT')} aria-label="Compact view" aria-pressed={view === 'COMPACT'} className={view === 'COMPACT' ? 'dark:text-portfolio-50 text-portfolio-950' : ' dark:text-portfolio-500 text-portfolio-800 cursor-pointer'}>
                                    <i className="fa-solid fa-bars" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <h2 id="product-heading" className="text-2xl sm:text-3xl md:text-5xl font-medium">{t('portfolio.work.project.package')}</h2>

                        {PROJECTS.map((project, index) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                mode={view}
                                isFirst={index === 0}
                            />
                        ))}

                    </section>

                    <section aria-labelledby="content-creator-heading" className="mt-16">
                        <h2 id="content-creator-heading" className="text-2xl sm:text-3xl md:text-5xl font-medium">{t('portfolio.work.content.creator')}</h2>
                        <div className="w-full">
                            <div className="border-l-2 pl-5 mt-5 border-portfolio-500 flex flex-col gap-5">
                                <div className="w-full flex flex-col md:flex-row gap-4">
                                    <div className="w-auto">
                                        <Image src="/images/work/tamilgamersnetwork.jpg" alt="Tamil Gamers Network logo" draggable="false" width={100} height={100} />
                                    </div>
                                    <div className="w-auto text-start">
                                        <p className="text-portfolio-50 text-2xl font-medium">{t('portfolio.work.tgn.name')}</p>
                                        <a href="https://www.youtube.com/@TamilGamersNetworks/videos" target="_blank" rel="noopener noreferrer" className="text-red-500 text-lg"><i className="fa-brands fa-youtube text-red-500 text-lg" aria-hidden="true"></i> {t('portfolio.work.tgn.content_creation')} <i className="fa-solid fa-up-right-from-square text-sm" aria-hidden="true"></i></a>
                                        <p className="text-portfolio-500 text-lg">{subscriberCount ? `${subscriberCount} ${t('portfolio.work.subscribers')}` : t('portfolio.work.subscribers')}</p>
                                    </div>
                                    <div className="w-full md:w-3/6">
                                        <p className="text-portfolio-500 text-lg line-clamp-4">{t('portfolio.work.tgn.desc')}</p>
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
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    draggable={false}
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <i className="fa-brands fa-youtube text-red-600 text-4xl drop-shadow-lg" aria-hidden="true"></i>
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
                    </section>

                    <section aria-labelledby="others-heading" className="mt-16">
                        <h2 id="others-heading" className="text-2xl sm:text-3xl md:text-5xl font-medium">{t('portfolio.work.others')}</h2>
                        <div className="border-l-2 pl-5 mt-8 border-portfolio-500">
                            <h3 className="text-3xl font-semibold">{t('portfolio.work.photoshop.battle')}</h3>
                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.photoshop.battle.desc')}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                                {PHOTOSHOP_BATTLES.map((battle, index) => (
                                    <button
                                        key={index}
                                        ref={el => battleButtonRefs.current[index] = el}
                                        type="button"
                                        className="relative aspect-video w-full overflow-hidden rounded-lg border border-portfolio-500/30 group text-left"
                                        onClick={() => openPreview(index)}
                                        aria-label={`View photoshop battle ${index + 1} fullscreen`}
                                    >
                                        <ImageDiff leftImageSrc={battle.left} rightImageSrc={battle.right} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 pointer-events-none flex items-center justify-center">
                                            <i className="fa-solid fa-expand text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="border-l-2 pl-5 mt-8 border-portfolio-500">
                            <h3 className="text-3xl font-semibold">{t('portfolio.work.steam.guide')}</h3>
                            <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.desc')}</p>
                            <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2732039208" target="_blank" rel="noopener noreferrer">
                                <div className="flex gap-2 mt-5">
                                    <Image src="/images/work/gameguide1.jpg" alt="" height={125} width={125} className="shrink-0" draggable={false} />
                                    <div>
                                        <p className="text-portfolio-500 text-base font-medium"><i className="fa-solid fa-gamepad" aria-hidden="true"></i> {t('portfolio.work.steam.guide.skyrim.game')}</p>
                                        <p className="text-2xl font-semibold">{t('portfolio.work.steam.guide.skyrim.title')}</p>
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.skyrim.desc1')}</p>
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.skyrim.desc2')}</p>
                                    </div>
                                </div>
                            </a>
                            <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3326170636" target="_blank" rel="noopener noreferrer">
                                <div className="flex gap-2 mt-5">
                                    <Image src="/images/work/gameguide2.jpg" alt="" height={125} width={125} className="shrink-0" draggable={false} />
                                    <div>
                                        <p className="text-portfolio-500 text-base font-medium"><i className="fa-solid fa-gamepad" aria-hidden="true"></i> {t('portfolio.work.steam.guide.kcd.game')}</p>
                                        <p className="text-2xl font-semibold">{t('portfolio.work.steam.guide.kcd.title')}</p>
                                        <p className="text-portfolio-500 text-lg">{t('portfolio.work.steam.guide.kcd.desc')}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>

                    </main>
                    <Footer />
                </div>
            </div>

            {previewIndex !== null && (
                <div id="preview-dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" role="dialog" aria-modal="true" aria-labelledby="preview-dialog-title" onClick={closePreview}>
                    <h2 id="preview-dialog-title" className="sr-only">{t('portfolio.work.photoshop.battle')} {previewIndex + 1} / {PHOTOSHOP_BATTLES.length}</h2>
                    <div className="relative w-[90vw] max-w-5xl max-h-[80vh] aspect-video" onClick={(e) => e.stopPropagation()}>
                        <ImageDiff
                            leftImageSrc={PHOTOSHOP_BATTLES[previewIndex].left}
                            rightImageSrc={PHOTOSHOP_BATTLES[previewIndex].right}
                        />
                    </div>

                    <button ref={closeButtonRef} onClick={closePreview} className="absolute top-6 right-6 text-white text-3xl hover:text-portfolio-300 transition-colors" aria-label="Close preview">
                        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                    </button>

                    <button onClick={(e) => { e.stopPropagation(); prevPreview(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-portfolio-300 transition-colors w-12 h-12 flex items-center justify-center" aria-label="Previous image">
                        <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                    </button>

                    <button onClick={(e) => { e.stopPropagation(); nextPreview(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-portfolio-300 transition-colors w-12 h-12 flex items-center justify-center" aria-label="Next image">
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm" aria-live="polite">
                        {previewIndex + 1} / {PHOTOSHOP_BATTLES.length}
                    </div>
                </div>
            )}
        </>
    );
}
