export interface Reel {
  id: string;
  instagramUrl: string;
  category: string;
  caption: string;
  coverUrl?: string; // static cover image path (public/) or external URL
}

export const REELS_CONTENT: Reel[] = [
  {
    id: "DcGzCH_v7kP",
    instagramUrl: "https://www.instagram.com/reel/DcGzCH_v7kP/",
    category: "Bikes",
    caption: "",
    coverUrl: "/covers/DcGzCH_v7kP.jpg",
  },
  {
    id: "DaDnppApWZA",
    instagramUrl: "https://www.instagram.com/reel/DaDnppApWZA/",
    category: "Cinematic",
    caption: "",
    coverUrl: "/covers/DaDnppApWZA.jpg",
  },
  {
    id: "DaUWsofJ4XA",
    instagramUrl: "https://www.instagram.com/reel/DaUWsofJ4XA/",
    category: "Bikes",
    caption: "",
    coverUrl: "/covers/DaUWsofJ4XA.jpg",
  },
];

