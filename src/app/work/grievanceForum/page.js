'use client'

import { useTranslation } from "react-i18next";

export default function GrievanceForum() {
    const {t, i18n, ready } = useTranslation();    
    if (!ready) return <></>;

    return (
        <>
        </>
    );
}
