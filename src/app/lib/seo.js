export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://manojtgn.me").replace(/\/$/, "");

export const SUPPORTED_LANGS = ["en", "es", "fr", "ta", "zh"];

export function hreflangAlternates(path = "/") {
    const clean = path.startsWith("/") ? path : `/${path}`;
    const languages = {};
    for (const lng of SUPPORTED_LANGS) {
        languages[lng] = `${clean}${clean.includes("?") ? "&" : "?"}lng=${lng}`;
    }
    languages["x-default"] = clean;
    return {
        canonical: clean,
        languages,
    };
}
