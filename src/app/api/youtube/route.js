import { isRateLimited, getClientIp } from "@/app/lib/contact";
import {
    jsonOk,
    jsonError,
    methodNotAllowed,
    preflight,
    rateLimitHeaders,
    isSameOrigin,
    forbiddenOrigin,
    ERROR_CODES,
} from "@/app/lib/api";

const ALLOWED = ["GET", "HEAD", "OPTIONS"];

const CHANNEL_ID = "UCIpx-ZquNHFjjODgW5_yroQ";

const CACHE_TTL_MS = 30 * 60 * 1000;
const STALE_TTL_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;

const IP_PER_MIN = 30;
const IP_PER_HOUR = 200;

const EMPTY_DATA = { videos: [], subscriberCount: null };

let cache = { data: null, fetchedAt: 0, etag: null, inflight: null };

async function fetchWithTimeout(url, timeoutMs) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { signal: controller.signal, cache: "no-store" });
    } finally {
        clearTimeout(id);
    }
}

function formatSubs(raw) {
    const n = Number(raw);
    if (!Number.isFinite(n) || n < 0) return null;
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n);
}

async function fetchYouTube(apiKey) {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&id=${encodeURIComponent(CHANNEL_ID)}&key=${encodeURIComponent(apiKey)}`;
    const channelRes = await fetchWithTimeout(channelUrl, FETCH_TIMEOUT_MS);
    if (!channelRes.ok) throw new Error(`channels HTTP ${channelRes.status}`);
    const channelData = await channelRes.json();
    if (!channelData.items?.length) return EMPTY_DATA;

    const item = channelData.items[0];
    const subscriberCount = formatSubs(item.statistics?.subscriberCount);
    const uploadsPlaylistId = item.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) return { videos: [], subscriberCount };

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${encodeURIComponent(uploadsPlaylistId)}&maxResults=6&key=${encodeURIComponent(apiKey)}`;
    const videosRes = await fetchWithTimeout(playlistUrl, FETCH_TIMEOUT_MS);
    if (!videosRes.ok) throw new Error(`playlistItems HTTP ${videosRes.status}`);
    const videosData = await videosRes.json();

    const videos = (videosData.items || [])
        .map((v) => {
            const vid = v?.snippet?.resourceId?.videoId;
            if (typeof vid !== "string" || !/^[A-Za-z0-9_-]{6,16}$/.test(vid)) return null;
            const title = typeof v?.snippet?.title === "string" ? v.snippet.title.slice(0, 200) : "";
            const thumbnail = v?.snippet?.thumbnails?.high?.url || v?.snippet?.thumbnails?.medium?.url || null;
            const published = typeof v?.snippet?.publishedAt === "string" ? v.snippet.publishedAt : null;
            return { id: vid, title, link: `https://www.youtube.com/watch?v=${vid}`, thumbnail, published };
        })
        .filter(Boolean);

    return { videos, subscriberCount };
}

function computeEtag(body) {
    let h = 5381;
    const s = JSON.stringify(body);
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return `W/"yt-${(h >>> 0).toString(16)}"`;
}

async function getCached(apiKey) {
    const now = Date.now();
    if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
        return { body: cache.data, etag: cache.etag, source: "cache" };
    }
    if (cache.inflight) {
        const body = await cache.inflight;
        return { body, etag: cache.etag, source: "cache-inflight" };
    }
    cache.inflight = fetchYouTube(apiKey)
        .then((body) => {
            cache = { data: body, fetchedAt: Date.now(), etag: computeEtag(body), inflight: null };
            return body;
        })
        .catch((err) => {
            cache.inflight = null;
            throw err;
        });
    try {
        const body = await cache.inflight;
        return { body, etag: cache.etag, source: "fresh" };
    } catch (err) {
        if (cache.data && now - cache.fetchedAt < STALE_TTL_MS) {
            return { body: cache.data, etag: cache.etag, source: "stale" };
        }
        throw err;
    }
}

export async function OPTIONS() {
    return preflight(ALLOWED);
}

export async function GET(request) {
    if (!isSameOrigin(request)) return forbiddenOrigin();

    const ip = getClientIp(request);
    if (isRateLimited(`youtube:ip:1m:${ip}`, IP_PER_MIN, 60 * 1000)) {
        return jsonError(ERROR_CODES.RATE_LIMITED, "Too many requests, try again in a minute", {
            status: 429,
            headers: rateLimitHeaders({ limit: IP_PER_MIN, remaining: 0, resetAfterSec: 60, retryAfterSec: 60 }),
        });
    }
    if (isRateLimited(`youtube:ip:1h:${ip}`, IP_PER_HOUR, 60 * 60 * 1000)) {
        return jsonError(ERROR_CODES.RATE_LIMITED, "Hourly request limit reached", {
            status: 429,
            headers: rateLimitHeaders({ limit: IP_PER_HOUR, remaining: 0, resetAfterSec: 3600, retryAfterSec: 3600 }),
        });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;
    if (!API_KEY) {
        return jsonOk(EMPTY_DATA, {
            headers: { "Cache-Control": "public, max-age=3600" },
        });
    }

    try {
        const { body, etag, source } = await getCached(API_KEY);
        const inm = request.headers.get("if-none-match");
        if (inm && etag && inm === etag) {
            return new Response(null, {
                status: 304,
                headers: {
                    ETag: etag,
                    "Cache-Control": `public, max-age=${Math.floor(CACHE_TTL_MS / 1000)}, s-maxage=${Math.floor(CACHE_TTL_MS / 1000)}, stale-while-revalidate=86400`,
                    "X-Content-Type-Options": "nosniff",
                },
            });
        }
        return jsonOk(body, {
            headers: {
                "Cache-Control": `public, max-age=${Math.floor(CACHE_TTL_MS / 1000)}, s-maxage=${Math.floor(CACHE_TTL_MS / 1000)}, stale-while-revalidate=86400`,
                ETag: etag,
                "X-Cache-Source": source,
                Vary: "Origin, Referer",
            },
        });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.debug("[youtube] upstream failed:", err?.message || err);
        }
        return jsonError(ERROR_CODES.UPSTREAM_FAILED, "Upstream YouTube API failure", {
            status: 502,
            headers: { "Cache-Control": "public, max-age=60" },
        });
    }
}

export async function HEAD(request) {
    const res = await GET(request);
    return new Response(null, { status: res.status, headers: res.headers });
}

export async function POST() { return methodNotAllowed(ALLOWED); }
export async function PUT() { return methodNotAllowed(ALLOWED); }
export async function PATCH() { return methodNotAllowed(ALLOWED); }
export async function DELETE() { return methodNotAllowed(ALLOWED); }
