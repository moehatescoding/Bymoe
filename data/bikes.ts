export interface Bike {
  id: string;
  make: string;
  model: string;
  year: number;
  nickname?: string;
  status: 'Current' | 'Sold' | 'Project';
  heroImage: string;
  gallery: string[];
  story: string;
  setup: string;
  notes: string;
  modifications: string[]; // List of key mods
}

export const BIKES: Bike[] = [
  {
    id: 'z900',
    make: 'Kawasaki',
    model: 'Z900',
    year: 2018,
    nickname: 'The Sugomi',
    status: 'Current',
    heroImage: '/z900.png',
    gallery: [
      '/z900.png'
    ],
    story: "I'd always dreamed of owning an inline-four. There weren't many bikes that really made sense to me—things like the Street Triple were great, but the Z900 just fit perfectly into my budget and what I wanted from a motorcycle. I also specifically wanted something with minimal electronics. Bikes are becoming more like computers and toys these days, with electronics doing half the work for you. I wanted to actually feel the motorcycle—the throttle, the power, the mistakes, everything. The Z900 gave me that raw, mechanical connection I was looking for.",
    setup: "I prefer a stiffer suspension setup to keep the bike planted and responsive. I run around 30 PSI in the front and 39 PSI in the rear. The slightly lower front pressure gives me better front-end feel and confidence, while the rear handles stability and acceleration load.",
    notes: "It's a 2018 model that I bought in 2026. Fairly old by today's standards—but honestly, that was part of the appeal. It still feels raw, simple, and properly mechanical. I'm a big fan of DIY and prefer working on the bike myself. The best part? It doesn't need a crazy list of modifications to feel perfect.",
    modifications: [
      'Yoshimura Alpha exhaust (Stock headers)',
      'Kawasaki OEM frame sliders',
      'BMC performance air filter'
    ]
  },
  {
    id: 'gt650',
    make: 'Royal Enfield',
    model: 'Continental GT 650',
    year: 2020,
    status: 'Project',
    heroImage: 'https://images.unsplash.com/photo-1609528148810-7db0774df2eb?q=80&w=2000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?q=80&w=1200&auto=format&fit=crop'
    ],
    story: "[Placeholder: Story behind the GT650 build.]",
    setup: "[Placeholder: Setup details for the GT650.]",
    notes: "[Placeholder: Personal notes and quirks.]",
    modifications: [
      '[Placeholder Modification 1]',
      '[Placeholder Modification 2]'
    ]
  }
];

export function getBike(id: string): Bike | undefined {
  return BIKES.find(bike => bike.id === id);
}
