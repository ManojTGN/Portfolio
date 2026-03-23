'use client'

import { useTranslation } from "react-i18next";

const entries = [
    { period: '2024 - Present', companyKey: 'portfolio.experience.zoho.fullname', roleKey: 'portfolio.experience.zoho.role', highlight: true },
    { period: '2023', companyKey: 'portfolio.experience.nit.fullname', roleKey: 'portfolio.experience.nit.role', highlight: false },
];

function EntryContent({ entry, t }) {
    return (
        <>
            <p className="text-sm dark:text-portfolio-400 text-portfolio-500 mb-1">{entry.period}</p>
            <p className="text-sm mb-1 dark:text-white text-portfolio-950">{t(entry.companyKey)}</p>
            <span className={`text-sm inline-block ${entry.highlight
                ? 'bg-portfolio-950 dark:bg-portfolio-300/80 text-portfolio-50 dark:text-portfolio-950 px-1'
                : 'dark:text-portfolio-300 text-portfolio-700'
            }`}>
                {t(entry.roleKey)}
            </span>
        </>
    );
}

export default function Timeline() {
    const { t } = useTranslation();

    return (
        <div className="w-full mt-8">
            <div className="md:hidden">
                <div className="flex gap-2 ml-px mb-1" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="w-1 h-1 rounded-full dark:bg-portfolio-900 bg-portfolio-100" />
                    ))}
                </div>

                <div className="border-l dark:border-portfolio-500 border-portfolio-400">
                    {entries.map((entry, i) => (
                        <div key={i} className="relative pl-5 py-3">
                            <div className="absolute left-[-1px] top-0 w-4 h-px dark:bg-portfolio-500 bg-portfolio-400" aria-hidden="true" />
                            <EntryContent entry={entry} t={t} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:block">
                <div className="grid grid-cols-4">
                    {[0, 1, 2, 3].map((col) => {
                        const entry = col === 1 ? entries[0] : col === 3 ? entries[1] : null;
                        return (
                            <div key={col} className={col > 0 && col != 2 ? 'border-l dark:border-portfolio-500 border-portfolio-400' : ''}>
                                <div className="flex h-3 items-end" aria-hidden="true">
                                    {col === 0
                                        ? Array.from({ length: 7 }).map((_, j) => (
                                            <div key={j} className="flex-1 flex justify-center">
                                                <div className="w-1 h-1 rounded-full dark:bg-portfolio-900 bg-portfolio-100" />
                                            </div>
                                        ))
                                        : Array.from({ length: 7 }).map((_, j) => (
                                            <div key={j} className="flex-1 border-r dark:border-portfolio-700 border-portfolio-300 h-3" />
                                        ))
                                    }
                                </div>
                                {entry != null ? (
                                    <div className={`pt-3 pb-2 pr-4 ${col > 0 ? 'pl-4' : ''}`}>
                                        <EntryContent entry={entry} t={t} />
                                    </div>
                                ) : (
                                    <div className="pt-3 pb-2" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
