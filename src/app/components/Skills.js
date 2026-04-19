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
            <div className="mt-5">
                <p className="text-xl text-portfolio-950 dark:text-white font-medium">
                    {t('portfolio.skills.bring.heading')}
                </p>
                <p className="text-portfolio-500 text-base mt-2">
                    {t('portfolio.skills.bring.desc')}
                </p>
            </div>
            {CATEGORIES.map((cat) => (
                <div key={cat.key} className="mt-6">
                    <p className="text-xl text-portfolio-950 dark:text-white font-medium flex items-center gap-2">
                        <i className={`fa-solid ${cat.icon} ${cat.color}`} aria-hidden="true"></i>
                        {t(`portfolio.skills.${cat.key}`)}
                    </p>
                    <p className="text-portfolio-500 dark:text-portfolio-500 text-base border-l-2 pl-5 border-portfolio-500 mt-2">
                        {cat.items.map((item) => t(`portfolio.skills.${cat.key}.${item}`)).join(' · ')}
                    </p>
                </div>
            ))}
        </>
    );
}
