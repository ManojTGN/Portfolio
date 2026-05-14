export const sizeMap = {
    small: '11px',
    medium: '15px',
    large: '19px'
};

export const wordSpacingMap = {
    normal: 'normal',
    medium: '0.15em',
    large: '0.3em'
};

export const letterSpacingMap = {
    normal: 'normal',
    medium: '0.05em',
    large: '0.1em'
};

export const cursorSizes = ['default', 'small', 'medium', 'large'];

export const pageTransitionValues = ['on', 'off'];

export function prefersReducedMotion() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
