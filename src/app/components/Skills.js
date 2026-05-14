'use client'

import { useTranslation } from "react-i18next";

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
            <div className="mt-5 border-l-2 pl-5 border-portfolio-500">
                <p className="text-portfolio-950 dark:text-white text-2xl font-medium">
                    {t('portfolio.skills.bring.heading')}
                </p>
                <p className="text-portfolio-500 text-lg mt-2">
                    {t('portfolio.skills.bring.desc')}
                </p>
            </div>

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

        </>
    );
}
