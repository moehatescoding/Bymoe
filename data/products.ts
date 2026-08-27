export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge?: string;
  image: string;
  description: string;
  features: string[];
  externalUrl: string;
  sourceLabel?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "diy-hydro-dip",
    name: "DIY Hydro Dip Supplies & Kit",
    tagline: "Water transfer printing materials for motorcycle panels & helmets",
    category: "DIY & Custom",
    badge: "Recommended / DIY",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    description: "The exact hydrographic film and aerosol activator supplies used in my DIY carbon transfer tutorials. Recommended for treating ABS fairings, mirror cowls, and custom accents at home.",
    features: [
      "High-definition Twill / Forged Carbon film pattern",
      "Specialized aerosol activator solvent",
      "Compatible with plastic adhesion promoters & 2K clear",
      "Best for ABS plastics, fiberglass & metals"
    ],
    externalUrl: "https://www.amazon.in/s?k=hydrographic+film+carbon+fiber+activator",
    sourceLabel: "Find on Amazon / Supplies"
  },
  {
    id: "iftex-clean-system-23",
    name: "IFTEX Clean System 23",
    tagline: "Concentrated PEA fuel injector & valve detergent",
    category: "Maintenance",
    badge: "Essential Maintenance",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
    description: "The fuel system detergent I use on my bikes every 3,000 km to dissolve ethanol gum and keep injector spray patterns clean without tearing down the throttle bodies.",
    features: [
      "Concentrated Polyetheramine (PEA) formula",
      "Cleans intake valves & combustion chamber carbon",
      "Counteracts ethanol moisture corrosion",
      "Safe for catalytic converters & O2 sensors"
    ],
    externalUrl: "https://www.iftex.com/fuel-additives/ftex-clean-system-23/",
    sourceLabel: "IFTEX Official"
  },
  {
    id: "yoshimura-exhaust",
    name: "Yoshimura Alpha T Slip-On Exhaust",
    tagline: "Street legal deep tone with stock header compatibility",
    category: "Performance",
    badge: "Exhaust Mod",
    image: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
    description: "Delivers a deeper, throatier inline-four acoustic character while shaving unsprung weight and retaining the factory catalytic converter and sensors.",
    features: [
      "Works finish stainless steel canister",
      "Carbon fiber end cap",
      "Direct bolt-on slip-on fitment"
    ],
    externalUrl: "https://superbikestore.in/products/yoshimura-alpha-t-works-street-slip-on-exhaust-for-kawasaki-z900-2020",
    sourceLabel: "Superbike Store"
  },
  {
    id: "frame-slider-protection",
    name: "Heavy-Duty Frame Sliders",
    tagline: "Chassis & engine protection pucks for drop defense",
    category: "Protection",
    badge: "Must-Have",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
    description: "High-density Delrin slider pucks with CNC machined brackets to keep engine covers and frame rails off the asphalt in the event of a low-speed tip over.",
    features: [
      "No-cut fairing mounting",
      "Impact absorbing Delrin pucks",
      "Corrosion-resistant anodized brackets"
    ],
    externalUrl: "https://www.kawasaki.com/en-us/shop/vehicle-accessories/motorcycle",
    sourceLabel: "OEM / Store"
  },
  {
    id: "bmc-air-filter",
    name: "BMC High-Flow Performance Air Filter",
    tagline: "Washable high-flow multi-layer cotton gauze intake filter",
    category: "Performance",
    badge: "Airflow Mod",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop",
    description: "Reusable multi-layer oiled cotton filter element that improves airflow over restrictive paper filters and lasts the lifetime of the motorcycle.",
    features: [
      "Precision polyurethane frame",
      "Washable & re-oilable design",
      "Direct drop-in replacement for OEM airbox"
    ],
    externalUrl: "https://superbikestore.in/products/bmc-air-filter-for-kawasaki-z900",
    sourceLabel: "Superbike Store"
  },
  {
    id: "motul-chain-care-kit",
    name: "Motul Chain Clean & Lube Road Kit",
    tagline: "Essential O-ring safe cleaning & synthetic lubrication kit",
    category: "Maintenance",
    badge: "Routine Care",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
    description: "The standard aerosol cleaning solvent and high-adhesion synthetic chain lube I recommend for all sealed 520/525/530 motorcycle drive chains.",
    features: [
      "Chlorine-free solvent safe on rubber O/X rings",
      "Anti-fling water-resistant road lubricant",
      "Prevents roller corrosion & reduces drag"
    ],
    externalUrl: "https://www.amazon.in/s?k=motul+chain+cleaner+and+lube+kit",
    sourceLabel: "Amazon"
  }
];
