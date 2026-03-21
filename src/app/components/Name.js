import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useTranslation } from "react-i18next";

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(Physics2DPlugin);

const BASE_FONT_SIZE = 3.75;
const MIN_FONT_WEIGHT = 100;
const MAX_FONT_WEIGHT = 900;
const DEFAULT_FONT_WEIGHT = 600;

export default function Name() {
    const { t } = useTranslation();
    const textRef = useRef(null);

    useGSAP(() => {
        const el = textRef.current;
        if (!el) return;

        gsap.set(el, { opacity: 1 });

        let isExploding = false;
        let split = SplitText.create(el, { type: "chars, words" });

        const onMouseMove = (event) => {
            if (isExploding) return;

            const rect = el.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;

            split.chars.forEach(char => {
                const charRect = char.getBoundingClientRect();
                const charX = charRect.left + charRect.width / 2 - rect.left;

                const offset = mouseX - charX;
                const distance = Math.abs(offset);
                const rotation = distance / 10;
                const deltaFontSize = 0.1 + ((rotation - 1) * (0.7 - 0.1)) / (10 - 1);

                let weight = MAX_FONT_WEIGHT - Math.floor(rotation) * 100;
                if (weight < MIN_FONT_WEIGHT) weight = MIN_FONT_WEIGHT;

                gsap.to(char, {
                    fontWeight: weight,
                    rotate: offset < 0 ? rotation : -rotation,
                    fontSize: `${BASE_FONT_SIZE - deltaFontSize}rem`,
                    textShadow: "0px 0px 0px black, 2px 2px 8px deeppink",
                    duration: 0.2,
                });
            });
        };

        const onMouseLeave = () => {
            if (isExploding) return;

            split.chars.forEach(char => {
                gsap.to(char, { fontWeight: DEFAULT_FONT_WEIGHT, rotate: 0, duration: 0.2, fontSize: `${BASE_FONT_SIZE}rem`, textShadow: '' });
            });
        };

        const onClick = () => {
            if (isExploding) return;

            isExploding = true;
            el.classList.remove('cursor-pointer');
            el.classList.add('cursor-help');

            split.chars.forEach(char => {
                gsap.to(char, {
                    duration: 1.2,
                    physics2D: {
                        velocity: "random(600, 850)",
                        angle: "random(0,360)",
                        gravity: 600
                    },
                    opacity: 0,
                    stagger: { amount: 10 }
                });

                gsap.to(char, {
                    x: 0, y: 0, rotation: 0,
                    fontWeight: DEFAULT_FONT_WEIGHT,
                    fontSize: `${BASE_FONT_SIZE}rem`,
                    textShadow: '',
                    delay: 1.2
                });

                const exploding = gsap.to(char, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut",
                    delay: 1.5
                });

                exploding.eventCallback("onComplete", () => {
                    isExploding = false;
                    el.classList.add('cursor-pointer');
                    el.classList.remove('cursor-help');
                });
            });
        };

        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);
        el.addEventListener('click', onClick);

        return () => {
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onMouseLeave);
            el.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <p ref={textRef} tabIndex={0} aria-label={t("portfolio.top.realname.label")} translate="no" className="text-4xl sm:text-5xl lg:text-6xl text-portfolio-950 dark:text-white font-bold flex-none cursor-pointer select-none">
            {t("portfolio.top.realname")}
        </p>
    );
}
