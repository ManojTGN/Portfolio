'use client'

import Link from "next/link";
import { useTranslation } from "react-i18next";

// Five capability pillars. Each carries a value-proposition tagline (the "why
// should a recruiter care" line) plus a flat list of items rendered as inline
// chips. Key + icon + color are the only structural metadata here — copy lives
// in the locale files.
const CATEGORIES = [
    {
        key: 'core',
        icon: 'fa-cubes',
        color: 'text-sky-500',
        items: ['system_design', 'backend', 'api', 'database', 'debugging'],
    },
    {
        key: 'perf',
        icon: 'fa-gauge-high',
        color: 'text-orange-500',
        items: ['tuning', 'memory', 'low_level', 'concurrency', 'scalability'],
    },
    {
        key: 'build',
        icon: 'fa-rocket',
        color: 'text-fuchsia-500',
        items: ['feature', 'prototyping', 'production', 'code_quality', 'testing'],
    },
    {
        key: 'thinking',
        icon: 'fa-lightbulb',
        color: 'text-amber-400',
        items: ['problem_solving', 'tradeoff', 'clean_architecture', 'failure', 'optimization'],
    },
    {
        key: 'tools',
        icon: 'fa-screwdriver-wrench',
        color: 'text-emerald-500',
        items: ['dev_tooling', 'automation', 'cli', 'git'],
    },
];

export default function Skills() {
    const { t } = useTranslation();

    return (
        <>
            {/* Lead — same border-l-2 idiom as Experiences / Toolsets / Contact */}
            <div className="mt-5 border-l-2 pl-5 border-portfolio-500">
                <p className="text-portfolio-950 dark:text-white text-2xl font-medium">
                    {t('portfolio.skills.bring.heading')}
                </p>
                <p className="text-portfolio-500 text-lg mt-2">
                    {t('portfolio.skills.bring.desc')}
                </p>
            </div>

            {/* Pillar grid — 1-col mobile, 2-col tablet+. Each card carries an
                editorial sequence number, an icon, the pillar name, a value-prop
                tagline, and the underlying items as chips. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mt-10">
                {CATEGORIES.map((cat, idx) => (
                    <article
                        key={cat.key}
                        className="border-l-2 pl-5 border-portfolio-500 transition-colors hover:border-portfolio-950 dark:hover:border-portfolio-50"
                        aria-labelledby={`skills-pillar-${cat.key}`}
                    >
                        <div className="flex items-baseline justify-between">
                            <i className={`fa-solid ${cat.icon} ${cat.color} text-3xl`} aria-hidden="true"></i>
                            <span className="text-portfolio-300 dark:text-portfolio-700 text-3xl font-bold tabular-nums tracking-tight select-none" aria-hidden="true">
                                {String(idx + 1).padStart(2, '0')}
                            </span>
                        </div>
                        <h3 id={`skills-pillar-${cat.key}`} className="text-portfolio-950 dark:text-white text-xl font-medium mt-3">
                            {t(`portfolio.skills.${cat.key}`)}
                        </h3>
                        <p className="text-portfolio-500 italic text-base mt-1 leading-snug">
                            {t(`portfolio.skills.${cat.key}.tagline`)}
                        </p>
                        <ul className="flex flex-wrap gap-1.5 mt-4" aria-label={t(`portfolio.skills.${cat.key}`)}>
                            {cat.items.map((item) => (
                                <li
                                    key={item}
                                    className="text-portfolio-500 dark:text-portfolio-500 text-sm border border-portfolio-300 dark:border-portfolio-700 px-2 py-0.5"
                                >
                                    {t(`portfolio.skills.${cat.key}.${item}`)}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>

            {/* CTA — converts intent into action. Border-l keeps the visual rhythm. */}
            <div className="mt-12 border-l-2 pl-5 border-portfolio-500">
                <p className="text-portfolio-950 dark:text-white font-medium text-xl">
                    {t('portfolio.skills.cta.title')}
                </p>
                <p className="text-portfolio-500 mt-2 text-lg">
                    {t('portfolio.skills.cta.body')}
                </p>
                <Link
                    href="/contact"
                    className="group mt-4 inline-flex items-center gap-2 font-medium underline text-portfolio-950 dark:text-portfolio-50 hover:no-underline"
                >
                    <span>{t('portfolio.skills.cta.button')}</span>
                    <i className="fa-solid fa-arrow-right text-sm transition-transform group-hover:translate-x-0.5" aria-hidden="true"></i>
                </Link>
            </div>
        </>
    );
}
