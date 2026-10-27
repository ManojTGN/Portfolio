export const sizeMap = {
    small: "11px",
    medium: "15px",
    large: "19px",
};

export const wordSpacingMap = {
    normal: "normal",
    medium: "0.15em",
    large: "0.3em",
};

export const letterSpacingMap = {
    normal: "normal",
    medium: "0.05em",
    large: "0.1em",
};

export const cursorSizes = ["default", "small", "medium", "large"];

export const pageTransitionValues = ["on", "off"];

export function prefersReducedMotion() {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const listeners = new Set();

export function subscribeToSettings(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

// Chosen values are held here as well as in localStorage, so the settings
// still apply when storage is unavailable (private browsing, blocked site
// data). Persistence is the bonus; working is the requirement.
const chosen = new Map();

export function readSetting(key, fallback, isValid) {
    if (chosen.has(key)) return chosen.get(key);

    try {
        const stored = localStorage.getItem(key);
        return stored !== null && isValid(stored) ? stored : fallback;
    } catch {
        return fallback;
    }
}

export function writeSetting(key, value) {
    chosen.set(key, value);
    try {
        localStorage.setItem(key, value);
    } catch {}
    for (const listener of listeners) listener();
}
