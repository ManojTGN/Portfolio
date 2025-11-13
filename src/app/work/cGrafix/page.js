'use client'

import { useTranslation } from "react-i18next";

export default function CGrafix() {
    const {t, i18n, ready } = useTranslation();    
    if (!ready) return <></>;

    return (
        <>
        </>
    );
}
