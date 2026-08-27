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
    year: 2022,
    nickname: 'The Sugomi',
    status: 'Current',
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1200&auto=format&fit=crop'
    ],
    story: "[Placeholder: Story of why you bought the Z900 and what it means to you.]",
    setup: "[Placeholder: Detail your riding setup, tyre pressures, suspension stiffness, etc.]",
    notes: "[Placeholder: Personal quirks, maintenance notes, or advice for this bike.]",
    modifications: [
      '[Placeholder Modification 1]',
      '[Placeholder Modification 2]',
      '[Placeholder Modification 3]',
      '[Placeholder Modification 4]'
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
