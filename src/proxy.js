import { NextResponse } from "next/server";

export function proxy(request) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const isProd = process.env.NODE_ENV === "production";

    const directives = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isProd ? "" : "'unsafe-eval'"} https://www.google.com https://www.gstatic.com https://www.recaptcha.net https://va.vercel-scripts.com https://www.googletagmanager.com`.replace(/\s+/g, " ").trim(),
        // Dev: Turbopack's HMR style-injector can't carry a nonce, so we
        // accept 'unsafe-inline' there. Prod: nonce-only, no escape hatch.
        // FontAwesome is self-hosted from /fonts/fontawesome — covered by 'self'.
        `style-src 'self' ${isProd ? `'nonce-${nonce}'` : "'unsafe-inline'"} https://fonts.googleapis.com`,
        `style-src-elem 'self' ${isProd ? `'nonce-${nonce}'` : "'unsafe-inline'"} https://fonts.googleapis.com`,
        "font-src 'self' data: https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://i.ytimg.com https://www.googletagmanager.com https://www.google-analytics.com",
        "frame-src 'self' https://www.google.com https://www.recaptcha.net",
        "connect-src 'self' https://www.google.com https://vitals.vercel-insights.com https://www.google-analytics.com https://*.analytics.google.com https://*.google-analytics.com https://www.googletagmanager.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
    ];
    const csp = directives.join("; ");

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", csp);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", csp);
    return response;
}

export const config = {
    matcher: [
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml)).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};
