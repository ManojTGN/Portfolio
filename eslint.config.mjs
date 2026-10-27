// Flat config (ESLint 9). Replaces the legacy .eslintrc.json after Next 16
// removed `next lint` — `npm run lint` now shells out to the ESLint CLI.
// `core-web-vitals` already brings its own ignores for .next/, out/ and build/.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [...nextCoreWebVitals];

export default config;
