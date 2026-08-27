export interface Accessory {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  description: string;
  externalUrl: string;
}

export const accessoriesByBike: Record<string, Accessory[]> = {
  z900: [
    {
      id: "accessory-1",
      name: "[QUESTION FOR MOE: First Accessory Name?]",
      category: "[QUESTION FOR MOE: Category? (e.g. Performance, Protection)]",
      brand: "[QUESTION FOR MOE: Brand?]",
      image: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
      description: "[QUESTION FOR MOE: Why do you use this? Personal review here.]",
      externalUrl: "" // leave empty until link provided
    },
    {
      id: "accessory-2",
      name: "[QUESTION FOR MOE: Second Accessory Name?]",
      category: "[QUESTION FOR MOE: Category? (e.g. Performance, Protection)]",
      brand: "[QUESTION FOR MOE: Brand?]",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
      description: "[QUESTION FOR MOE: Why do you use this? Personal review here.]",
      externalUrl: "" // leave empty until link provided
    }
  ]
};

export function getAccessory(bikeId: string, partId: string): Accessory | undefined {
  const accessories = accessoriesByBike[bikeId] || [];
  return accessories.find(a => a.id === partId);
}
