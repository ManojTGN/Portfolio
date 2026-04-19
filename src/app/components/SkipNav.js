'use client'

import { useTranslation } from "react-i18next";

export default function SkipNav() {
    const { t } = useTranslation();
    return (
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-portfolio-950 focus:text-white focus:px-4 focus:py-2 focus:rounded">
            {t('portfolio.a11y.skip.nav')}
        </a>
    );
}
