'use client'

import { useEffect } from 'react';

const sizeMap = {
    small: '11px',
    medium: '15px',
    large: '19px'
};

const wordSpacingMap = {
    normal: 'normal',
    medium: '0.15em',
    large: '0.3em'
};

const letterSpacingMap = {
    normal: 'normal',
    medium: '0.05em',
    large: '0.1em'
};

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
