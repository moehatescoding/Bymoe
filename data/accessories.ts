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
      id: "yoshimura-exhaust",
      name: "Yoshimura Alpha T Works Street Slip-On Exhaust",
      category: "Performance",
      brand: "Yoshimura",
      image: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
      description: "Gives the Z900 a deeper, more aggressive inline-four sound while keeping the stock headers.",
      externalUrl: "https://superbikestore.in/products/yoshimura-alpha-t-works-street-slip-on-exhaust-for-kawasaki-z900-2020"
    },
    {
      id: "frame-slider",
      name: "Frame Slider Set",
      category: "Protection",
      brand: "Kawasaki",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
      description: "Protects the motorcycle from unnecessary damage in case of a drop.",
      externalUrl: "https://www.kawasaki.com/en-us/shop/vehicle-accessories/motorcycle/zr900ckfb/999941010/frame-slider-set"
    },
    {
      id: "fork-protectors",
      name: "Fork Protectors",
      category: "Protection",
      brand: "R&G Racing",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
      description: "Protects the front forks and axle area in case of a slide or drop.",
      externalUrl: "https://motoblazer.com/shop/riding-gear/armour-protection/rg-kawasaki-z900-fork-protector/"
    },
    {
      id: "radiator-grill",
      name: "Radiator Grill",
      category: "Protection",
      brand: "Aftermarket",
      image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop",
      description: "Protects the radiator from stones and road debris.",
      externalUrl: "https://www.amazon.in/Motorcycle-Radiator-Grille-Protective-Kawasaki/dp/B075WQSB4F"
    },
    {
      id: "reservoir-caps",
      name: "Front & Rear Master Cylinder Reservoir Caps",
      category: "Styling",
      brand: "Vagary",
      image: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
      description: "A small cosmetic detail that personalizes the braking setup.",
      externalUrl: "https://www.amazon.in/Vagary-Cylinder-Reservoir-Kawasaki-Z900/dp/B0CMDD19QC"
    },
    {
      id: "rear-fork-protector",
      name: "Rear Fork Protector",
      category: "Protection",
      brand: "Evotech",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
      description: "Adds protection to the swingarm and rear axle area.",
      externalUrl: "https://www.riderzplanet.com/products/evotech-rear-fork-protector-for-kawasaki-z900"
    },
    {
      id: "swingarm-spools",
      name: "Swingarm Spools",
      category: "Maintenance / Protection",
      brand: "Primo Customs",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
      description: "Makes it easier to use a paddock stand and offers additional swingarm protection.",
      externalUrl: "https://primocustoms.co.in/products/kawasaki-z900-swing-arm-spools"
    },
    {
      id: "air-filter",
      name: "Performance Air Filter",
      category: "Performance",
      brand: "BMC",
      image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop",
      description: "Improves airflow and complements the performance setup of the inline-four engine.",
      externalUrl: "https://superbikestore.in/products/bmc-air-filter-for-kawasaki-z900?variant=31370357211234"
    },
    {
      id: "brake-pads",
      name: "Brake Pads",
      category: "Braking",
      brand: "EBC",
      image: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
      description: "Improves braking feel and confidence.",
      externalUrl: "https://www.bikerspad.com/products/kawasaki-z900-brake-pads-ebc"
    },
    {
      id: "fuel-additive",
      name: "Clean System 23 Fuel Additive",
      category: "Maintenance",
      brand: "IFtex",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
      description: "Used to help keep the fuel system and engine clean.",
      externalUrl: "https://www.iftex.com/fuel-additives/ftex-clean-system-23/"
    },
    {
      id: "fuel-cap",
      name: "Quick-Turn Fuel Cap",
      category: "Styling / Functional",
      brand: "Accossato",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
      description: "A functional and cosmetic upgrade that adds a more premium detail to the bike.",
      externalUrl: "https://www.motodracing.com/accossato-kawasaki-ninja-650-z650-z900-quick-turn-fuel-cap/engine"
    }
  ]
};

export function getAccessory(bikeId: string, partId: string): Accessory | undefined {
  const accessories = accessoriesByBike[bikeId] || [];
  return accessories.find(a => a.id === partId);
}
