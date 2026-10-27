export const PAGE_CONTAINER = "w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-[70%] max-w-[1400px]";

// The page container is wide so grids and artwork can breathe, but running
// prose the full width gives 150-180 characters a line. Readable measure is
// 45-75, so body copy gets its own cap.
export const PROSE_WIDTH = "max-w-[70ch]";

// Written out rather than interpolated so Tailwind's scanner can see them.
export const LOGO_MAX_WIDTH_CLASS = {
    280: "max-w-[280px]",
    480: "max-w-[480px]",
    600: "max-w-[600px]",
    1080: "max-w-[1080px]",
};
