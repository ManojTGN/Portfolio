/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: 'standalone',
    poweredByHeader: false,
    compress: true,
    compiler: {
        removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
    },
    experimental: {
        optimizePackageImports: ['gsap', 'react-i18next', 'i18next', 'next-themes'],
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'i.ytimg.com' },
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24 * 30,
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
                    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
                    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
                ],
            },
            {
                source: '/llms.txt',
                headers: [
                    { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
                    { key: 'Cache-Control', value: 'public, max-age=86400' },
                ],
            },
            {
                source: '/ai.txt',
                headers: [
                    { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
                    { key: 'Cache-Control', value: 'public, max-age=86400' },
                ],
            },
        ];
    },
};

export default nextConfig;
