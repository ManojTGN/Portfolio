import crypto from "crypto";

export const ERROR_CODES = {
    INVALID_JSON: "INVALID_JSON",
    INVALID_CONTENT_TYPE: "INVALID_CONTENT_TYPE",
    PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
    METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
    VALIDATION_FAILED: "VALIDATION_FAILED",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    RATE_LIMITED: "RATE_LIMITED",
    UPSTREAM_FAILED: "UPSTREAM_FAILED",
    SERVER_ERROR: "SERVER_ERROR",
    SERVER_MISCONFIGURED: "SERVER_MISCONFIGURED",
};

const MAX_BODY_BYTES_DEFAULT = 16 * 1024;

// application/json with optional whitespace and optional charset/parameters.
// Rejects close matches like application/jsonp+xxx or application/json5.
const CONTENT_TYPE_JSON_RE = /^application\/json\s*(?:;\s*[^;]+)*$/i;

function baseHeaders(extra = {}) {
    return {
        "Content-Type": "application/json; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "no-referrer",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
        ...extra,
    };
}

function envelopeMeta() {
    return {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
    };
}

export function jsonOk(data, { status = 200, headers = {} } = {}) {
    const body = { data: data ?? null, meta: envelopeMeta() };
    return new Response(JSON.stringify(body), {
        status,
        headers: baseHeaders(headers),
    });
}

export function jsonError(code, message, { status = 400, details, headers = {} } = {}) {
    const error = { code, message };
    if (details !== undefined) error.details = details;
    const body = { error, meta: envelopeMeta() };
    return new Response(JSON.stringify(body), {
        status,
        headers: baseHeaders(headers),
    });
}

export function methodNotAllowed(allowedMethods) {
    const allow = allowedMethods.join(", ");
    return jsonError(
        ERROR_CODES.METHOD_NOT_ALLOWED,
        `Method not allowed. Allowed: ${allow}`,
        { status: 405, headers: { Allow: allow } }
    );
}

export function preflight(allowedMethods, allowedOrigins = []) {
    const allow = allowedMethods.join(", ");
    const headers = {
        Allow: allow,
        "Cache-Control": "public, max-age=86400",
    };
    if (allowedOrigins.length > 0) {
        headers["Access-Control-Allow-Methods"] = allow;
        headers["Access-Control-Allow-Headers"] = "Content-Type, Idempotency-Key";
        headers["Access-Control-Max-Age"] = "86400";
        headers["Vary"] = "Origin";
    }
    return new Response(null, { status: 204, headers });
}

export function allowedHostsForSite() {
    const expectedHost = process.env.NEXT_PUBLIC_SITE_HOST
        || (process.env.NEXT_PUBLIC_SITE_URL && new URL(process.env.NEXT_PUBLIC_SITE_URL).host)
        || "manojtgn.me";
    return new Set([expectedHost, `www.${expectedHost}`, "localhost", "localhost:3000"]);
}

// Same-origin enforcement: prefer the Origin header (always sent on
// cross-origin fetches and on POSTs from modern browsers), fall back to
// Referer. Missing both means the request didn't come from a browser
// navigation context, which on a public-facing form route is suspicious.
export function isSameOrigin(request) {
    const allowed = allowedHostsForSite();
    for (const header of ["origin", "referer"]) {
        const value = request.headers.get(header);
        if (!value) continue;
        try {
            return allowed.has(new URL(value).host);
        } catch {
            return false;
        }
    }
    return false;
}

export function forbiddenOrigin() {
    return jsonError(ERROR_CODES.FORBIDDEN, "Origin not permitted", { status: 403 });
}

export async function requireJsonBody(request, { maxBytes = MAX_BODY_BYTES_DEFAULT } = {}) {
    const contentType = request.headers.get("content-type") || "";
    if (!CONTENT_TYPE_JSON_RE.test(contentType.trim())) {
        return {
            error: jsonError(
                ERROR_CODES.INVALID_CONTENT_TYPE,
                "Content-Type must be application/json",
                { status: 415 }
            ),
        };
    }
    const declaredLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
        return {
            error: jsonError(
                ERROR_CODES.PAYLOAD_TOO_LARGE,
                `Request body exceeds ${maxBytes} bytes`,
                { status: 413 }
            ),
        };
    }
    let raw;
    try {
        raw = await request.text();
    } catch {
        return {
            error: jsonError(ERROR_CODES.INVALID_JSON, "Unable to read request body", { status: 400 }),
        };
    }
    if (raw.length > maxBytes) {
        return {
            error: jsonError(
                ERROR_CODES.PAYLOAD_TOO_LARGE,
                `Request body exceeds ${maxBytes} bytes`,
                { status: 413 }
            ),
        };
    }
    if (!raw) return { body: {} };
    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch {
        return {
            error: jsonError(ERROR_CODES.INVALID_JSON, "Body is not valid JSON", { status: 400 }),
        };
    }
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
        return {
            error: jsonError(ERROR_CODES.INVALID_JSON, "Body must be a JSON object", { status: 400 }),
        };
    }
    return { body: parsed };
}

export function rateLimitHeaders({ limit, remaining, resetAfterSec, retryAfterSec }) {
    const h = {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(Math.max(0, remaining)),
        "X-RateLimit-Reset": String(Math.floor(Date.now() / 1000) + resetAfterSec),
    };
    if (typeof retryAfterSec === "number") {
        h["Retry-After"] = String(retryAfterSec);
    }
    return h;
}
