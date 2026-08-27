export interface Reel {
  id: string;
  instagramHandle: string;
  instagramUrl: string;
  videoUrl: string; // The raw .mp4 for the preview
  thumbnailUrl: string; // The static fallback for mobile/reduced motion
  category: string;
  caption: string;
}

export const REELS_CONTENT: Reel[] = [
  {
    id: "reel-1",
    instagramHandle: "@moegical",
    instagramUrl: "https://instagram.com/moegical",
    videoUrl: "https://customer-676b7g2v0047v78g.cloudflarestream.com/90d4f61f74fa5a3a2b7f7e9121ec3338/downloads/default.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
    category: "[QUESTION FOR MOE: Reel Category? e.g. Cinematic]",
    caption: "[QUESTION FOR MOE: Reel Caption?]"
  },
  {
    id: "reel-2",
    instagramHandle: "@moegical",
    instagramUrl: "https://instagram.com/moegical",
    videoUrl: "https://customer-676b7g2v0047v78g.cloudflarestream.com/90d4f61f74fa5a3a2b7f7e9121ec3338/downloads/default.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
    category: "[QUESTION FOR MOE: Reel Category? e.g. Bikes]",
    caption: "[QUESTION FOR MOE: Reel Caption?]"
  },
  {
    id: "reel-3",
    instagramHandle: "@moegical",
    instagramUrl: "https://instagram.com/moegical",
    videoUrl: "https://customer-676b7g2v0047v78g.cloudflarestream.com/90d4f61f74fa5a3a2b7f7e9121ec3338/downloads/default.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
    category: "[QUESTION FOR MOE: Reel Category? e.g. Random]",
    caption: "[QUESTION FOR MOE: Reel Caption?]"
  }
];
