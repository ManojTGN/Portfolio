"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";

gsap.registerPlugin(Draggable);

export default function Carousel({ showArrow = true, autoScroll=true, images = [] }) {
    const containerRef = useRef(null);
    const draggableRef = useRef(null);
    const activeIndexRef = useRef(0);
    const slideWidthRef = useRef(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || images.length === 0) return;

        const container = containerRef.current;
        const slides = gsap.utils.toArray(container.children);
        const slideCount = slides.length;

        slideWidthRef.current = container.offsetWidth;

        const moveToIndex = (index) => {
            activeIndexRef.current = gsap.utils.wrap(0, slideCount)(index);
            gsap.to(container, {
                x: -activeIndexRef.current * slideWidthRef.current,
                duration: 0.5,
                ease: "power3.out",
            });
        };

        const draggable = Draggable.create(container, {
            type: "x",
            inertia: true,
            bounds: { minX: -(slideCount - 1) * slideWidthRef.current, maxX: 0 },
            onDragStart() {
                stopAutoScroll();
            },
            onDragEnd() {
                const progress = -this.x / slideWidthRef.current;
                const nearestIndex = Math.round(progress);
                moveToIndex(nearestIndex);
                startAutoScroll();
            },
        })[0];

        draggableRef.current = draggable;

        const handleResize = () => {
            slideWidthRef.current = container.offsetWidth;
            moveToIndex(activeIndexRef.current);
        };
        window.addEventListener("resize", handleResize);

        const startAutoScroll = () => {
            if (!autoScroll) return;
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                moveToIndex(activeIndexRef.current + 1);
            }, 3000);
        };

        const stopAutoScroll = () => {
            clearInterval(intervalRef.current);
        };

        if (autoScroll) startAutoScroll();

        return () => {
            draggable.kill();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, autoScroll]);

    const nextSlide = () => {
        const container = containerRef.current;
        if (!container) return;
        const slideCount = images.length;
        const nextIndex = Math.min(activeIndexRef.current + 1, slideCount - 1);
        gsap.to(container, {
            x: -nextIndex * slideWidthRef.current,
            duration: 0.2,
            ease: "power3.out",
            onComplete: () => (activeIndexRef.current = nextIndex),
        });
    };

    const prevSlide = () => {
        const container = containerRef.current;
        if (!container) return;
        const prevIndex = Math.max(activeIndexRef.current - 1, 0);
        gsap.to(container, {
            x: -prevIndex * slideWidthRef.current,
            duration: 0.2,
            ease: "power3.out",
            onComplete: () => (activeIndexRef.current = prevIndex),
        });
    };


    if (images.length === 0) {
        return <></>;
    }

  return (
    <div className="relative overflow-hidden w-full h-full select-none">
      <div ref={containerRef} className="flex w-full h-full cursor-grab active:cursor-grabbing touch-none">
        {images.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 w-full h-full">
            <Image
                src={src} alt="" fill
                className="object-cover" draggable="false"
            />
          </div>
        ))}
      </div>
        {showArrow?<>
        <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-portfolio-50 hover:text-portfolio-700 text-white p-2 transition">
            <i className="fa-solid fa-caret-left"></i>
        </button>
        <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-portfolio-50 hover:text-portfolio-700 text-white p-2 transition">
            <i className="fa-solid fa-caret-right"></i>
        </button></>
        :<></>}
    </div>
  );
}
