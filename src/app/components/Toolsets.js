"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

const BRAND_DIR = "/images/work/brand";

const TOOL_GROUPS = [
    {
        id: "frontend",
        headingKey: "portfolio.skills.frontend.development",
        tools: [
            { labelKey: "portfolio.skills.js", faClass: "fa-brands fa-js text-yellow-500" },
            { labelKey: "portfolio.skills.nextjs", image: `${BRAND_DIR}/Next.js.svg`, imageClass: "dark:invert" },
            { labelKey: "portfolio.skills.react", faClass: "fa-brands fa-react text-blue-500" },
            { labelKey: "portfolio.skills.gsap", image: `${BRAND_DIR}/gsap.png` },
            { labelKey: "portfolio.skills.tailwind", image: `${BRAND_DIR}/tailwind.svg` },
            { labelKey: "portfolio.skills.bootstrap", faClass: "fa-brands fa-bootstrap text-pink-500" },
        ],
    },
    {
        id: "backend",
        headingKey: "portfolio.skills.backend.systems",
        tools: [
            { labelKey: "portfolio.skills.c", image: `${BRAND_DIR}/C.svg` },
            { labelKey: "portfolio.skills.cpp", image: `${BRAND_DIR}/C++.svg` },
            { labelKey: "portfolio.skills.nodejs", faClass: "fa-brands fa-node-js text-lime-500" },
            { labelKey: "portfolio.skills.java", image: `${BRAND_DIR}/java.svg` },
            { labelKey: "portfolio.skills.python", image: `${BRAND_DIR}/Python.svg` },
            { labelKey: "portfolio.skills.git", image: `${BRAND_DIR}/Git.svg` },
            { labelKey: "portfolio.skills.docker", faClass: "fa-brands fa-docker text-blue-500" },
            { labelKey: "portfolio.skills.mysql", image: `${BRAND_DIR}/MySQL.svg` },
            { labelKey: "portfolio.skills.postgres", image: `${BRAND_DIR}/PostgresSQL.svg` },
        ],
    },
    {
        id: "creative",
        headingKey: "portfolio.skills.frontend.design.creative.tools",
        tools: [
            { labelKey: "portfolio.skills.photoshop", image: `${BRAND_DIR}/AdobePhotoshop.svg`, iconSize: 20 },
            { labelKey: "portfolio.skills.premiere", image: `${BRAND_DIR}/AdobePremierePro.svg`, iconSize: 20 },
            { labelKey: "portfolio.skills.figma", image: `${BRAND_DIR}/Figma.svg`, iconSize: 20 },
            { labelKey: "portfolio.skills.steamguide", faClass: "fa-brands fa-square-steam text-blue-900" },
        ],
    },
];

const DEFAULT_ICON_SIZE = 30;

export default function Toolsets() {
    const { t } = useTranslation();

    return (
        <>
            {TOOL_GROUPS.map((group) => (
                <section key={group.headingKey} aria-labelledby={`toolset-${group.id}`}>
                    <h3
                        id={`toolset-${group.id}`}
                        className="text-xl text-portfolio-950 dark:text-white font-medium mt-5"
                    >
                        {t(group.headingKey)}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-0">
                        {group.tools.map((tool) => (
                            <li
                                key={tool.labelKey}
                                className="w-full border-l-2 pl-5 border-portfolio-500 dark:border-portfolio-500 mt-5"
                            >
                                <p className="flex items-center gap-2 text-portfolio-500 dark:text-portfolio-500 font-medium text-xl">
                                    {tool.faClass ? (
                                        <i className={tool.faClass} aria-hidden="true"></i>
                                    ) : (
                                        <Image
                                            src={tool.image}
                                            alt=""
                                            width={tool.iconSize ?? DEFAULT_ICON_SIZE}
                                            height={tool.iconSize ?? DEFAULT_ICON_SIZE}
                                            draggable={false}
                                            className={`h-auto ${tool.imageClass ?? ""}`}
                                        />
                                    )}
                                    {t(tool.labelKey)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </>
    );
}
