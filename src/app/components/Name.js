import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useTranslation } from "react-i18next";

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Physics2DPlugin  } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(Physics2DPlugin);

export default function Name() {
    const {t, i18n, ready } = useTranslation();
    
    const fontSize = 3.75;
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.set(textRef.current, { opacity: 1 });

        let isExploding = false;
        let split = SplitText.create(textRef.current, { type: "chars, words"});

        textRef.current.addEventListener('mousemove',(event)=>{
            if(isExploding) return;

            const rect = textRef.current.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            
            split.chars.forEach(char => {
                const charRect = char.getBoundingClientRect();
                const charX = charRect.left + charRect.width / 2 - rect.left;

                const _dist = mouseX - charX;
                const distance = Math.abs(_dist);
                const rotation = distance / 10;
                const deltaFontSize = 0.1 + ((rotation - 1) * (0.7 - 0.1)) / (10 - 1);

                let weight = 900 - Math.floor(rotation) * 100;
                if (weight < 100) weight = 100;

                gsap.to(char, { fontWeight: weight, rotate: (_dist) < 0 ? rotation: -rotation,fontSize:`${fontSize - deltaFontSize}rem`, textShadow: "0px 0px 0px black, 2px 2px 8px deeppink", duration: 0.2 });
            });
        });

        textRef.current.addEventListener('mouseleave', () => {
            if(isExploding) return;
            
            split.chars.forEach(char => {
                gsap.to(char, { fontWeight: 600, rotate:0, duration: 0.2, fontSize:`${fontSize}rem`, textShadow:`` });
            });
        });

        textRef.current.addEventListener('click', () => {
            if(isExploding) return;

            isExploding = true;
            textRef.current.classList.remove('cursor-pointer');
            textRef.current.classList.add('cursor-help');

            split.chars.forEach(char => {
                gsap.to(char, { 
                    duration: 1.2,
                    physics2D: {
                        velocity: "random(600, 850)",
                        angle: "random(0,360)",
                        gravity: 600
                    },
                    opacity:0,
                    stagger: {
                        amount: 10
                    }
                });

                gsap.to(char, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    fontWeight: 600,
                    fontSize:`${fontSize}rem`, 
                    textShadow:``,
                    delay: 1.2
                })

                const exploding = gsap.to(char,{
                    opacity:1,
                    duration: .5,
                    ease: "power2.inOut",
                    delay: 1.5
                });
                
                exploding.eventCallback("onComplete", ()=>{
                    isExploding = false;
                    textRef.current.classList.add('cursor-pointer');
                    textRef.current.classList.remove('cursor-help');
                });
            });
        })
    }, []);

    return <>
        <p ref={textRef} tabIndex={0} aria-label={t("portfolio.top.realname.label")} translate="no" className={`text-6xl text-portfolio-950 dark:text-white font-bold flex-none cursor-pointer select-none`}> 
            {t("portfolio.top.realname")} 
        </p>
    </>
}