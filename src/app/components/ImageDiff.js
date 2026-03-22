'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

export default function ImageDiff({ leftImageSrc, rightImageSrc, leftLabel, rightLabel }) {
    const { t } = useTranslation();
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const finalLeftLabel = leftLabel || t('portfolio.image.diff.original');
    const finalRightLabel = rightLabel || t('portfolio.image.diff.modified');

    const handleMouseDown = useCallback(() => setIsDragging(true), []);
    const handleMouseUp = useCallback(() => setIsDragging(false), []);

    const handleMove = useCallback((clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    }, []);

    const onMouseMove = useCallback((e) => handleMove(e.clientX), [handleMove]);
    const onTouchMove = useCallback((e) => handleMove(e.touches[0].clientX), [handleMove]);

    const handleKeyDown = useCallback((e) => {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            setSliderPosition(prev => Math.max(0, prev - step));
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            setSliderPosition(prev => Math.min(100, prev + step));
        } else if (e.key === 'Home') {
            e.preventDefault();
            setSliderPosition(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            setSliderPosition(100);
        }
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, onMouseMove, onTouchMove, handleMouseUp]);

    return (
        <div ref={containerRef} className="relative w-full h-full select-none group cursor-col-resize overflow-hidden" onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
            {rightImageSrc && (
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={rightImageSrc}
                        alt={finalRightLabel}
                        fill
                        className="object-cover"
                        draggable={false}
                    />
                    {finalRightLabel && (
                        <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10" aria-hidden="true">
                            {finalRightLabel}
                        </span>
                    )}
                </div>
            )}

            {leftImageSrc && (
                <div className="absolute inset-0 w-full h-full" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                    <Image
                        src={leftImageSrc}
                        alt={finalLeftLabel}
                        fill
                        className="object-cover"
                        draggable={false}
                    />
                    {finalLeftLabel && (
                        <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10" aria-hidden="true">
                            {finalLeftLabel}
                        </span>
                    )}
                </div>
            )}

            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20"
                style={{ left: `${sliderPosition}%` }}
                role="slider"
                tabIndex={0}
                aria-label="Image comparison slider"
                aria-valuenow={Math.round(sliderPosition)}
                aria-valuemin={0}
                aria-valuemax={100}
                onKeyDown={handleKeyDown}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-950" aria-hidden="true">
                        <path d="M18 8L22 12L18 16" />
                        <path d="M2 12H22" />
                        <path d="M6 8L2 12L6 16" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
