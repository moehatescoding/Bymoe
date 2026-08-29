import { NextRequest, NextResponse } from 'next/server';

// Instagram oEmbed endpoint — public, no auth required
const IG_OEMBED = 'https://graph.facebook.com/v21.0/instagram_oembed';

// Strict regex whitelist for valid Instagram post/reel/tv URLs
const INSTAGRAM_URL_REGEX = /^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+\/?$/;

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  // Validate presence and format against whitelist
  if (!url || !INSTAGRAM_URL_REGEX.test(url)) {
    return NextResponse.json(
      { error: 'Invalid or unsupported Instagram URL parameter' },
      { status: 400 }
    );
  }

  try {
    // oEmbed returns a thumbnail_url pointing to Instagram's CDN
    const oembedUrl = new URL(IG_OEMBED);
    oembedUrl.searchParams.set('url', url);
    oembedUrl.searchParams.set('fields', 'thumbnail_url');

    // App token: optional — without it oEmbed still works for public posts
    if (process.env.INSTAGRAM_APP_TOKEN) {
      oembedUrl.searchParams.set('access_token', process.env.INSTAGRAM_APP_TOKEN);
    }

    const res = await fetch(oembedUrl.toString(), {
      next: { revalidate: 86400 }, // cache 24 h
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'oEmbed fetch failed', status: res.status }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ thumbnail_url: data.thumbnail_url ?? null });
  } catch (err) {
    console.error('[ig-thumb]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
