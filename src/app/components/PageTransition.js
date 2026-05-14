'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTheme } from 'next-themes';
import { gsap } from "gsap";

import { prefersReducedMotion } from "@/app/lib/accessibility";

export default function PageTransition({ children }) {

    const router = useRouter();
    const pathName = usePathname();
    const { theme,resolvedTheme } = useTheme();

    const overlayRef = useRef(null);
    const blocksRef = useRef([]);
    const isTransitionRef = useRef(null);

    const isTransitionEnabled = () => {
        if (prefersReducedMotion()) return false;
        try { return localStorage.getItem('pageTransition') !== 'off'; } catch { return true; }
    };

    const isSafeInternalPath = (url) => {
        return typeof url === 'string' && url.startsWith('/') && !url.startsWith('//');
    };

    useEffect(() => {
        const handleRouteChange = (url) => {
            if(isTransitionRef.current) return;
            isTransitionRef.current = true;
            if (!isTransitionEnabled()) {
                router.push(url);
                isTransitionRef.current = false;
                return;
            }
            coverPage(url);
        };

        createBlocks();
        gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });
        if (isTransitionEnabled()) {
            revealPage();
        } else {
            isTransitionRef.current = false;
        }

        const linkHandlers = [];
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
            const handler = (e) => {
                const href = e.currentTarget.getAttribute("href");
                if (!isSafeInternalPath(href)) return;
                e.preventDefault();
                const url = new URL(href, window.location.origin).pathname;
                if(url !== pathName){
                    handleRouteChange(url);
                }
            };
            link.addEventListener("click", handler);
            linkHandlers.push({ link, handler });
        });

        const onCustomTransition = (e) => {
            const url = e?.detail;
            if(!isSafeInternalPath(url) || url === pathName) return;
            handleRouteChange(url);
        };
        window.addEventListener("page-transition", onCustomTransition);

        return () => {
            linkHandlers.forEach(({ link, handler }) => {
                link.removeEventListener("click", handler);
            });
            window.removeEventListener("page-transition", onCustomTransition);
        };
    },[router, pathName]);

    const createBlocks = () => {
        if(!overlayRef.current) return;
        overlayRef.current.innerHTML = "";
        blocksRef.current = [];

        for(let i = 0; i < 20; i++) {
            const block = document.createElement("div");
            block.className = `flex-1 h-full ${resolvedTheme === 'dark' ? 'bg-portfolio-50' : 'bg-portfolio-950'} transform scale-x-0 origin-left`;
            overlayRef.current.appendChild(block);
            blocksRef.current.push(block);
        }
    };
    
    useEffect(createBlocks,[resolvedTheme,theme]);

    const coverPage = (url) => {
        const t1 = gsap.timeline({
            onComplete: () => router.push(url),
        });

        t1.to(blocksRef.current, {
            scaleX: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            transformOrigin: "left",
        });
    };

    const revealPage = () => {
        gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });
        gsap.to(blocksRef.current, {
            scaleX: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            transformOrigin: "right",
            onComplete: () => isTransitionRef.current = false,
        });
    };

    return (
        <>
            <div ref={overlayRef} className="fixed top-0 left-0 w-screen h-screen flex z-[60] pointer-events-none"></div>
            {children}
        </>
    );
}