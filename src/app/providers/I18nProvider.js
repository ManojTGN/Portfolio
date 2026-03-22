'use client'

import { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n';

function HtmlLangSync() {
    const { i18n: instance } = useTranslation();

    useEffect(() => {
        const updateLang = (lng) => {
            document.documentElement.lang = lng;
        };

        updateLang(instance.language);
        instance.on('languageChanged', updateLang);

        return () => {
            instance.off('languageChanged', updateLang);
        };
    }, [instance]);

    return null;
}

export default function I18nProvider({ children }) {
    return (
        <I18nextProvider i18n={i18n}>
            <HtmlLangSync />
            {children}
        </I18nextProvider>
    );
}
