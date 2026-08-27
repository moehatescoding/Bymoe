export interface Accessory {
  id: string;
  name: string;
  brand: string;
  description: string;
  reason: string;
  image: string;
  externalUrl: string;
  price?: string; // Optional formatted price (e.g., "$1,200" or "₹85,000")
  specs?: { label: string; value: string }[]; // Optional technical specs
}

export const accessoriesByBike: Record<string, Accessory[]> = {
  'z900': [
    {
      id: 'exhaust',
      name: '[Placeholder Exhaust System]',
      brand: '[Placeholder Brand]',
      description: 'A full titanium performance exhaust system designed to significantly reduce weight while maximizing power output.',
      reason: '[Placeholder: Why I chose this specific exhaust over others for the Z900]',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop',
      externalUrl: '',
      price: '[PRICE_PLACEHOLDER]',
      specs: [
        { label: 'Material', value: '[PLACEHOLDER_MATERIAL]' },
        { label: 'Weight Diff', value: '[PLACEHOLDER_WEIGHT]' },
        { label: 'Power Gain', value: '[PLACEHOLDER_POWER]' },
      ]
    },
    {
      id: 'mirrors',
      name: '[Placeholder Bar-End Mirrors]',
      brand: '[Placeholder Brand]',
      description: 'Low-profile aerospace-grade aluminum bar-end mirrors for a cleaner cockpit aesthetic and wider field of view.',
      reason: '[Placeholder: Why I swapped the stock insect-antennas for these]',
      image: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?q=80&w=800&auto=format&fit=crop', 
      externalUrl: '',
      price: '[PRICE_PLACEHOLDER]'
    },
    {
      id: 'crash_protection',
      name: '[Placeholder Frame Sliders]',
      brand: '[Placeholder Brand]',
      description: 'Heavy-duty Delrin frame sliders designed to protect the engine casing and trellis frame in the event of a drop.',
      reason: '[Placeholder: Why these specific sliders provide the best protection for stunt/street riding]',
      image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop',
      externalUrl: '',
    },
    {
      id: 'front_wheel',
      name: '[Placeholder Tyre Model - Front]',
      brand: '[Placeholder Tyre Brand]',
      description: 'High-performance street tyre offering maximum grip and feedback in all lean angles.',
      reason: '[Placeholder: Why this tyre compound works best for my riding style]',
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=800&auto=format&fit=crop',
      externalUrl: '',
      specs: [
        { label: 'Size', value: '[PLACEHOLDER_SIZE]' },
        { label: 'Compound', value: '[PLACEHOLDER_COMPOUND]' }
      ]
    },
    {
      id: 'rear_wheel',
      name: '[Placeholder Tyre Model - Rear]',
      brand: '[Placeholder Tyre Brand]',
      description: 'High-performance street tyre offering maximum grip and feedback.',
      reason: '[Placeholder: Why this tyre compound works best for my riding style]',
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=800&auto=format&fit=crop',
      externalUrl: '',
      specs: [
        { label: 'Size', value: '[PLACEHOLDER_SIZE]' },
        { label: 'Compound', value: '[PLACEHOLDER_COMPOUND]' }
      ]
    }
  ]
};

export function getAccessory(bikeId: string, partId: string): Accessory | undefined {
  return accessoriesByBike[bikeId]?.find(acc => acc.id === partId);
}
