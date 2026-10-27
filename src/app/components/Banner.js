"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { useHydrated } from "@/app/lib/hooks";
import { PROJECTS } from "@/app/lib/projects";
import { PAGE_CONTAINER } from "@/app/lib/ui";

const COUNTDOWN_URL = "https://www.manojtgn.me/VI";

// The banner lives in the root layout so it animates once per visit rather
// than on every navigation, which also puts it on the 404. An announcement
// does not belong on an error page, so it runs on the real pages only.
const BANNER_ROUTES = new Set([
    "/",
    "/work",
    "/sidequests",
    "/contact",
    "/accessibility",
    "/sitemap",
    ...PROJECTS.map((project) => `/work/${project.slug}`),
]);

const RETIRES_AT = new Date(2026, 10, 21).getTime(); // 00:00 on 21 Nov 2026, local

const LOADED_AT = Date.now();
const HAS_RETIRED = LOADED_AT >= RETIRES_AT;

function frondPath({ len, curve, leaflets, blade, tipAngle = 20, baseAngle = 58, grow = 0.42 }) {
    const n = (v) => v.toFixed(1);
    const rib = (t) => [len * t, curve * t * t];
    const dir = (t) => {
        const [dx, dy] = [len, 2 * curve * t];
        const m = Math.hypot(dx, dy);
        return [dx / m, dy / m];
    };
    const rot = ([x, y], deg) => {
        const a = (deg * Math.PI) / 180;
        const c = Math.cos(a);
        const s = Math.sin(a);
        return [x * c - y * s, x * s + y * c];
    };

    const half = (len / leaflets) * 0.44;
    const parts = [];

    for (let i = 0; i < leaflets; i++) {
        const t = (i + 0.5) / leaflets;
        const [px, py] = rib(t);
        const d = dir(t);
        const theta = baseAngle - (baseAngle - tipAngle) * Math.pow(t, 0.8);
        const shape = Math.sin(
            Math.PI * Math.min(1, t < grow ? (t / grow) * 0.5 : 0.5 + ((t - grow) / (1 - grow)) * 0.5),
        );
        const l = blade * Math.pow(shape, 0.55);

        for (const side of [1, -1]) {
            const [lx, ly] = rot(d, side * theta);
            const tip = [px + lx * l, py + ly * l];
            const b1 = [px - d[0] * half, py - d[1] * half];
            const b2 = [px + d[0] * half, py + d[1] * half];
            const bow = 0.18 * l;
            const c1 = [px + lx * l * 0.55 - d[0] * bow, py + ly * l * 0.55 - d[1] * bow];
            const c2 = [px + lx * l * 0.5 + d[0] * bow * 0.6, py + ly * l * 0.5 + d[1] * bow * 0.6];
            parts.push(
                `M${n(b1[0])} ${n(b1[1])}Q${n(c1[0])} ${n(c1[1])} ${n(tip[0])} ${n(tip[1])}Q${n(c2[0])} ${n(c2[1])} ${n(b2[0])} ${n(b2[1])}Z`,
            );
        }
    }

    const [tx, ty] = rib(1);
    parts.push(`M0 -1.4L${n(tx)} ${n(ty - 0.5)}L${n(tx)} ${n(ty + 0.5)}L0 1.4Z`);
    return parts.join("");
}

const TONES = ["#483b62", "#3f3358"];

const LEFT_FRONDS = [
    { x: -36, y: -6, rot: 17, len: 470, curve: 30, leaflets: 17, blade: 66, tone: 1 },
    { x: -44, y: 66, rot: -16, len: 410, curve: -26, leaflets: 15, blade: 58, tone: 0 },
    { x: 170, y: -16, rot: 28, len: 265, curve: 18, leaflets: 11, blade: 44, tone: 0 },
    { x: -150, y: 26, rot: 2, len: 430, curve: 10, leaflets: 14, blade: 72, tone: 1 },
];

const RIGHT_FRONDS = [
    { x: -30, y: -10, rot: 21, len: 445, curve: 27, leaflets: 16, blade: 63, tone: 1 },
    { x: -50, y: 64, rot: -21, len: 385, curve: -24, leaflets: 14, blade: 55, tone: 0 },
    { x: 140, y: -14, rot: 24, len: 290, curve: 20, leaflets: 12, blade: 47, tone: 0 },
    { x: -160, y: 34, rot: -3, len: 450, curve: 12, leaflets: 15, blade: 70, tone: 1 },
];

const buildPaths = (fronds) =>
    fronds.map((f) => ({
        d: frondPath(f),
        transform: `translate(${f.x} ${f.y}) rotate(${f.rot})`,
        fill: TONES[f.tone],
    }));

const LEFT_PATHS = buildPaths(LEFT_FRONDS);
const RIGHT_PATHS = buildPaths(RIGHT_FRONDS);

const GULL = "M0 0c7-5.6 12.6-6.4 17-1.7 4.4-4.7 10-3.9 17 1.7-7-2.3-12.6-1.3-17 2.1-4.4-3.4-10-4.4-17-2.1Z";

function Fronds({ side }) {
    const mirrored = side === "right";
    const paths = mirrored ? RIGHT_PATHS : LEFT_PATHS;
    const art = paths.map((p, i) => <path key={i} d={p.d} transform={p.transform} fill={p.fill} />);

    return (
        <svg
            viewBox="0 0 430 60"
            preserveAspectRatio={mirrored ? "xMaxYMid slice" : "xMinYMid slice"}
            aria-hidden="true"
            focusable="false"
            className={`pointer-events-none absolute inset-y-0 h-full w-[26%] sm:w-[30%] lg:w-[32%] ${mirrored ? "right-0" : "left-0"}`}
        >
            {mirrored ? <g transform="translate(430 0) scale(-1 1)">{art}</g> : art}
        </svg>
    );
}

export default function Banner() {
    const { t } = useTranslation();
    const hydrated = useHydrated();
    const pathname = usePathname();

    if (!hydrated || HAS_RETIRED || !BANNER_ROUTES.has(pathname)) return null;

    const words = t("portfolio.banner.countdown").split(/\s+/).filter(Boolean);

    return (
        <div className="banner-shell w-full flex justify-center items-start">
            <div className={PAGE_CONTAINER}>
                <div className="banner-drop banner-sky relative w-full overflow-hidden h-[3.2rem] sm:h-[3.6rem] border-y-2 border-[#151529]">
                    <Fronds side="left" />
                    <Fronds side="right" />

                    <svg
                        viewBox="0 0 34 9"
                        aria-hidden="true"
                        focusable="false"
                        className="pointer-events-none absolute left-[62%] top-1/2 hidden h-[0.6rem] w-[2.26rem] -translate-y-1/2 xl:block"
                    >
                        <path d={GULL} transform="translate(0 6)" fill="#544166" />
                    </svg>

                    <p className="relative z-10 flex h-full flex-nowrap items-center justify-center gap-[0.4em] whitespace-nowrap px-3 text-center font-portfolio font-bold uppercase text-[#4b3b63] text-[0.66rem] sm:text-[0.8rem] md:text-[0.86rem] tracking-[0.14em] sm:tracking-[0.2em]">
                        {words.map((word, i) => (
                            <span key={`${word}-${i}`} className="banner-word inline-block">
                                {word}
                            </span>
                        ))}
                        <a
                            href={COUNTDOWN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t("portfolio.banner.live.aria")}
                            className="banner-word inline-flex h-full items-center px-1.5 underline decoration-2 underline-offset-[5px] transition-colors hover:text-[#2a2040] focus-visible:text-[#2a2040]"
                        >
                            {/* Own element: the endless pulse would replace the link's one-shot entrance. */}
                            <span className="banner-live">{t("portfolio.banner.live")}</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
