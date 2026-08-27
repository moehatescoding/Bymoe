export interface FriendContent {
  id: string;
  name: string;
  handle: string;
  context: string;
  reelUrl: string; // The external URL to the Instagram reel
  videoSrc: string; // Self-hosted or direct MP4 URL for the background preview
  thumbnailSrc: string; // Fallback image for reduced motion or loading states
}

export const FRIENDS_CONTENT: FriendContent[] = [
  {
    id: 'friend_1',
    name: '[PLACEHOLDER_NAME_1]',
    handle: '@[PLACEHOLDER_HANDLE_1]',
    context: '[PLACEHOLDER: Short context about this creator or why they are featured]',
    reelUrl: 'https://instagram.com/', // Replace with actual Reel URL
    videoSrc: '', // Replace with actual MP4 path, e.g., '/videos/reel_preview_1.mp4'
    thumbnailSrc: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'friend_2',
    name: '[PLACEHOLDER_NAME_2]',
    handle: '@[PLACEHOLDER_HANDLE_2]',
    context: '[PLACEHOLDER: Short context about this creator or why they are featured]',
    reelUrl: 'https://instagram.com/',
    videoSrc: '',
    thumbnailSrc: 'https://images.unsplash.com/photo-1609528148810-7db0774df2eb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'friend_3',
    name: '[PLACEHOLDER_NAME_3]',
    handle: '@[PLACEHOLDER_HANDLE_3]',
    context: '[PLACEHOLDER: Short context about this creator or why they are featured]',
    reelUrl: 'https://instagram.com/',
    videoSrc: '',
    thumbnailSrc: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop',
  }
];
