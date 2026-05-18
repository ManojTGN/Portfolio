'use client'

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { prefersReducedMotion } from "@/app/lib/accessibility";

const ROWS = 6;
const COLS = 6;
const TOTAL = ROWS * COLS;
const CELEBRATION_MS = 2400;
const ENTRANCE_MS = 1200;

function makeSolvableGrid(seed = 16) {
    const grid = new Array(TOTAL).fill(false);
    const moves = 12 + Math.floor(Math.random() * (seed - 12));
    for (let i = 0; i < moves; i++) {
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        toggleCross(grid, r, c);
    }
    if (grid.every((v) => !v)) toggleCross(grid, 2, 3);
    return grid;
}

function toggleCross(grid, r, c) {
    const flip = (rr, cc) => {
        if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) return;
        grid[rr * COLS + cc] = !grid[rr * COLS + cc];
    };
    flip(r, c);
    flip(r - 1, c);
    flip(r + 1, c);
    flip(r, c - 1);
    flip(r, c + 1);
}

export default function NotFound() {
    const { t } = useTranslation();
    const [puzzleMode, setPuzzleMode] = useState(false);
    const [grid, setGrid] = useState(() => new Array(TOTAL).fill(false));
    const [moves, setMoves] = useState(0);
    const [celebrating, setCelebrating] = useState(false);
    const [entering, setEntering] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [completed, setCompleted] = useState(false); // set true after first win; persists until page reload

    const startPuzzle = useCallback(() => {
        if (completed) return; // one-shot per page load
        setGrid(makeSolvableGrid());
        setMoves(0);
        setSeconds(0);
        setCelebrating(false);
        setPuzzleMode(true);
        setEntering(true);
    }, [completed]);

    // End the entrance animation after the radial sweep finishes.
    useEffect(() => {
        if (!entering) return;
        const id = setTimeout(() => setEntering(false), prefersReducedMotion() ? 50 : ENTRANCE_MS);
        return () => clearTimeout(id);
    }, [entering]);

    // Game clock: ticks every second while the player is playing.
    // Frozen during the entrance and celebration animations.
    useEffect(() => {
        if (!puzzleMode || entering || celebrating) return;
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(id);
    }, [puzzleMode, entering, celebrating]);

    const clickCell = useCallback((i) => {
        if (celebrating || entering) return;
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        setGrid((prev) => {
            const next = prev.slice();
            toggleCross(next, r, c);
            return next;
        });
        setMoves((m) => m + 1);
    }, [celebrating, entering]);

    const exitPuzzle = useCallback(() => {
        setPuzzleMode(false);
        setEntering(false);
        setCelebrating(false);
        setMoves(0);
        setSeconds(0);
    }, []);

    // Esc exits the puzzle back to the 404 hero.
    useEffect(() => {
        if (!puzzleMode) return;
        const onKey = (e) => {
            if (e.key === "Escape") exitPuzzle();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [puzzleMode, exitPuzzle]);

    // Win = every cell in the same state. Either all dark OR all glowing
    // counts. (For most starting scrambles only one of the two is reachable,
    // but accept whichever the player gets to first.)
    const winMode = useMemo(() => {
        if (!puzzleMode || moves === 0) return null;
        if (grid.every((v) => !v)) return "off";
        if (grid.every((v) => v)) return "on";
        return null;
    }, [grid, puzzleMode, moves]);
    const solved = winMode !== null;

    // When the puzzle is solved → play the celebration, then return to hero.
    // NOTE: depend on `solved` only. Including `celebrating` causes the cleanup
    // to clearTimeout the moment `setCelebrating(true)` triggers a re-run.
    useEffect(() => {
        if (!solved) return;
        setCelebrating(true);
        const reduced = prefersReducedMotion();
        const id = setTimeout(() => {
            setPuzzleMode(false);
            setCelebrating(false);
            setMoves(0);
            setCompleted(true); // lock the puzzle: 0 turns gold, button becomes inert until reload
        }, reduced ? 400 : CELEBRATION_MS);
        return () => clearTimeout(id);
    }, [solved]);

    return (
        <main
            id="main-content"
            className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-portfolio-950 dark:text-white"
        >
            {!puzzleMode ? (
                <div className="flex items-center gap-6 sm:gap-8">
                    <button
                        type="button"
                        onClick={startPuzzle}
                        disabled={completed}
                        title={completed ? "Already solved — reload the page to play again" : "Play lights out"}
                        aria-label={completed ? "404, puzzle solved" : "Activate hidden puzzle"}
                        className={`text-6xl sm:text-7xl md:text-8xl font-bold leading-none tracking-tight select-none transition-transform ${completed ? "cursor-default" : "cursor-pointer hover:scale-105 active:scale-95"}`}
                    >
                        <span aria-hidden="true">4</span>
                        <span
                            aria-hidden="true"
                            className={`font-medium ${completed ? "notfound-zero-gold" : "notfound-zero-purple"}`}
                        >
                            0
                        </span>
                        <span aria-hidden="true">4</span>
                    </button>
                    <div className="w-px h-16 sm:h-20 md:h-24 bg-portfolio-300 dark:bg-portfolio-700" aria-hidden="true"></div>
                    <p className="text-base sm:text-lg md:text-xl font-medium text-portfolio-700 dark:text-portfolio-300 max-w-xs">
                        {t('portfolio.notfound.desc')}
                    </p>
                </div>
            ) : (
                <PuzzleBoard
                    grid={grid}
                    moves={moves}
                    seconds={seconds}
                    solved={solved}
                    winMode={winMode}
                    celebrating={celebrating}
                    entering={entering}
                    onCell={clickCell}
                    onExit={exitPuzzle}
                />
            )}

            {puzzleMode && (
                <div className="mt-8 w-full max-w-md border-t border-dashed border-portfolio-300 dark:border-portfolio-700" aria-hidden="true"></div>
            )}

            {puzzleMode && (
                <p className="mt-6 text-base sm:text-lg font-medium text-portfolio-700 dark:text-portfolio-300 text-center max-w-md">
                    {t('portfolio.notfound.desc')}
                </p>
            )}

            <Link
                href="/"
                className="mt-8 group inline-flex items-center gap-2 text-portfolio-500 hover:text-portfolio-950 dark:hover:text-white transition-colors text-sm sm:text-base"
            >
                <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">←</span>
                <span className="underline underline-offset-4 decoration-portfolio-500/40 group-hover:decoration-current">
                    Return home
                </span>
            </Link>
        </main>
    );
}

function fmtTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function PuzzleBoard({ grid, moves, seconds, solved, winMode, celebrating, entering, onCell, onExit }) {
    const midR = (ROWS - 1) / 2;
    const midC = (COLS - 1) / 2;
    return (
        <div className="relative flex flex-col items-center">
            <div className="w-full flex items-center gap-3.5 mb-4">
                <button
                    type="button"
                    onClick={onExit}
                    aria-label="Back to 404"
                    disabled={celebrating}
                    className="w-8 h-8 inline-flex items-center justify-center flex-shrink-0 bg-transparent border border-white/15 rounded-lg text-purple-400 text-[1.1rem] leading-none cursor-pointer transition-colors duration-150 hover:bg-purple-500/10 hover:border-purple-400 hover:text-white active:translate-y-px focus-visible:outline-purple-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <span aria-hidden="true">←</span>
                </button>
                <div
                    aria-live="polite"
                    className="flex-1 text-[0.9rem] tracking-[0.08em] uppercase text-purple-400 text-center font-semibold [text-shadow:0_0_8px_rgba(168,85,247,0.35)]"
                >
                    All on or all off!{" "}
                    <span className="text-purple-400/60 italic font-normal normal-case tracking-[0.02em] ml-1">
                        if you can
                    </span>
                </div>
            </div>

            <div
                role="grid"
                aria-label="Lights out puzzle — click any digit to toggle it and its four neighbors. Turn them all off to win."
                className={`grid select-none ${entering ? "puzzle-entering" : ""} ${celebrating ? "puzzle-celebrating" : ""}`}
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
                {grid.map((lit, i) => {
                    const col = i % COLS;
                    const row = Math.floor(i / COLS);
                    const enterWave = Math.max(Math.abs(row - midR), Math.abs(col - midC));
                    const exitWave = row + col;
                    const char = (row + col) % 2 === 0 ? "4" : "0";
                    const styleObj = entering
                        ? { animationDelay: `${enterWave * 70}ms` }
                        : celebrating
                            ? { animationDelay: `${exitWave * 60}ms` }
                            : undefined;
                    return (
                        <button
                            key={i}
                            type="button"
                            role="gridcell"
                            aria-pressed={lit}
                            disabled={celebrating || entering}
                            onClick={() => onCell(i)}
                            style={styleObj}
                            className={`puzzle-cell ${lit ? "lit" : "dim"}`}
                        >
                            {char}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 w-full flex justify-between items-center text-xs sm:text-sm font-mono tabular-nums">
                <div className="inline-flex items-baseline gap-2">
                    <span className="uppercase tracking-[0.1em] text-[0.7rem] text-portfolio-500">Moves</span>
                    <span className="text-white font-semibold text-[1.05rem] [text-shadow:0_0_6px_rgba(168,85,247,0.25)]">{String(moves).padStart(2, "0")}</span>
                </div>
                <div className="inline-flex items-baseline gap-2">
                    <span className="uppercase tracking-[0.1em] text-[0.7rem] text-portfolio-500">Time</span>
                    <span className="text-white font-semibold text-[1.05rem] [text-shadow:0_0_6px_rgba(168,85,247,0.25)]">{fmtTime(seconds)}</span>
                </div>
            </div>

            {celebrating && (
                <div role="status" aria-live="polite" className="puzzle-banner">
                    <span className="puzzle-banner-icon" aria-hidden="true">✦</span>
                    <span>
                        All {winMode === "on" ? "on" : "off"} in {moves} moves · {fmtTime(seconds)}
                    </span>
                </div>
            )}
        </div>
    );
}
