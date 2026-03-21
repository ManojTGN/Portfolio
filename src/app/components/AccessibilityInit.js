'use client'

import { useEffect } from 'react';
import { sizeMap, wordSpacingMap, letterSpacingMap } from '@/app/lib/accessibility';

export default function AccessibilityInit() {
    useEffect(() => {
        const fontSize = localStorage.getItem('fontSize');
        if (fontSize && sizeMap[fontSize]) {
            document.documentElement.style.setProperty('--base-font-size', sizeMap[fontSize]);
        }

        const wordSpacing = localStorage.getItem('wordSpacing');
        if (wordSpacing && wordSpacingMap[wordSpacing]) {
            document.documentElement.style.setProperty('--word-spacing', wordSpacingMap[wordSpacing]);
        }

        const letterSpacing = localStorage.getItem('letterSpacing');
        if (letterSpacing && letterSpacingMap[letterSpacing]) {
            document.documentElement.style.setProperty('--letter-spacing', letterSpacingMap[letterSpacing]);
        }

        const cursorSize = localStorage.getItem('cursorSize');
        if (cursorSize && cursorSize !== 'default') {
            document.documentElement.setAttribute('data-cursor-size', cursorSize);
        }
    }, []);

    return null;
}
