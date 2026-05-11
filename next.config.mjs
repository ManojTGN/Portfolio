/** @type {import('next').NextConfig} */

// Content-Security-Policy directives. The directives below allow exactly the
// third parties this site actually uses:
//   - kit.fontawesome.com / ka-f.fontawesome.com — FontAwesome kit JS + CSS + fonts
//   - www.google.com / www.gstatic.com / www.recaptcha.net — reCAPTCHA challenge
//   - fonts.googleapis.com / fonts.gstatic.com — next/font Mrs Saint Delafield
//   - i.ytimg.com — YouTube video thumbnails (already whitelisted in images.remotePatterns)
//   - va.vercel-scripts.com — @vercel/analytics + @vercel/speed-insights script loader
//   - vitals.vercel-insights.com — @vercel/analytics + @vercel/speed-insights beacon endpoint (off-Vercel hosts)
//
// `'unsafe-inline'` is required on script-src for Next.js's hydration data
// (`__NEXT_DATA__` and inline event handlers from the framework). `'unsafe-eval'`
// is needed for dev-mode HMR; we narrow it to development only.
const isProd = process.env.NODE_ENV === "production";

const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"} https://kit.fontawesome.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net https://va.vercel-scripts.com`.replace(/\s+/g, " ").trim(),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com https://ka-f.fontawesome.com",
    "img-src 'self' data: blob: https://i.ytimg.com",
    "frame-src 'self' https://www.google.com https://www.recaptcha.net",
    "connect-src 'self' https://www.google.com https://ka-f.fontawesome.com https://vitals.vercel-insights.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
].join("; ");

const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'Content-Security-Policy', value: csp },
                ],
            },
        ];
    },
};

export default nextConfig;
