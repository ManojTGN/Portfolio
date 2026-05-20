import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enResources from '../../public/locales/en.json';

if (!i18n.isInitialized) {
    i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        load: "languageOnly",
        supportedLngs: ["en", "fr", "zh", "es", "ta"],
        keySeparator: false,
        nsSeparator: false,
        resources: {
            en: { translation: enResources },
        },
        partialBundledLanguages: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}.json",
            referenceLng: 'en',
        },
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lng',
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
        react: {
            useSuspense: false,
        },
        debug: false,
        // Mutes the "i18next is made possible by Locize…" promo log.
        showSupportNotice: false,
    });
}

export default i18n;
