export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handle: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    platform: 'Instagram',
    url: 'https://instagram.com/moegical',
    handle: '@moegical'
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    url: '[YOUTUBE_URL_PLACEHOLDER]',
    handle: '[YOUTUBE_HANDLE_PLACEHOLDER]'
  },
  {
    id: 'x',
    platform: 'X (Twitter)',
    url: '[TWITTER_URL_PLACEHOLDER]',
    handle: '[TWITTER_HANDLE_PLACEHOLDER]'
  },
  {
    id: 'email',
    platform: 'Email',
    url: 'mailto:hello@bymoe.in',
    handle: 'hello@bymoe.in'
  }
];

export interface SocialPost {
  id: string;
  imageUrl: string;
  caption: string;
  url: string;
  date: string;
}

/**
 * Placeholder data for the Instagram feed.
 * When integrating the real Instagram API, you simply replace this array
 * with a fetch call that maps the API response to the `SocialPost` interface.
 */
export const placeholderFeed: SocialPost[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop',
    caption: 'Dialing in the new setup on the Z900. The titanium system is absolutely ridiculous in person.',
    url: 'https://instagram.com/moegical',
    date: '2026-08-25'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
    caption: 'Late night garage sessions.',
    url: 'https://instagram.com/moegical',
    date: '2026-08-18'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop',
    caption: 'Tearing down the GT650. Starting the tracker build.',
    url: 'https://instagram.com/moegical',
    date: '2026-08-10'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1609528148810-7db0774df2eb?q=80&w=800&auto=format&fit=crop',
    caption: 'Sunday shakedown run.',
    url: 'https://instagram.com/moegical',
    date: '2026-08-02'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=800&auto=format&fit=crop',
    caption: 'Rubber details.',
    url: 'https://instagram.com/moegical',
    date: '2026-07-28'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
    caption: 'Into the dark.',
    url: 'https://instagram.com/moegical',
    date: '2026-07-20'
  }
];
