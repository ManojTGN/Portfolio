const CHANNEL_ID = 'UCIpx-ZquNHFjjODgW5_yroQ';

export async function GET() {
    const API_KEY = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (!API_KEY) {
        return Response.json({ videos: [], subscriberCount: null });
    }

    try {
        const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const channelData = await channelResponse.json();

        if (!channelData.items || channelData.items.length === 0) {
            return Response.json({ videos: [], subscriberCount: null });
        }

        const item = channelData.items[0];
        let subscriberCount = null;
        let subs = item.statistics.subscriberCount;
        if (subs) {
            if (subs >= 1000000) {
                subscriberCount = (subs / 1000000).toFixed(1) + 'M';
            } else if (subs >= 1000) {
                subscriberCount = (subs / 1000).toFixed(1) + 'K';
            } else {
                subscriberCount = String(subs);
            }
        }

        const uploadsPlaylistId = item.contentDetails.relatedPlaylists.uploads;
        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=6&key=${API_KEY}`
        );
        const videosData = await videosResponse.json();

        const videos = (videosData.items || []).map(videoItem => ({
            id: videoItem.snippet.resourceId.videoId,
            title: videoItem.snippet.title,
            link: `https://www.youtube.com/watch?v=${videoItem.snippet.resourceId.videoId}`,
            thumbnail: videoItem.snippet.thumbnails.high?.url || videoItem.snippet.thumbnails.medium?.url,
            published: videoItem.snippet.publishedAt
        }));

        return Response.json({ videos, subscriberCount });
    } catch (error) {
        console.error("YouTube API error:", error);
        return Response.json({ videos: [], subscriberCount: null }, { status: 500 });
    }
}
