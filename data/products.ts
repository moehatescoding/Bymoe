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
    name: "DIY Hydro Dip Supplies & Kit (CF074B)",
    tagline: "HGI carbon fiber water transfer printing combo pack for parts & gear",
    category: "DIY & Custom",
    badge: "Recommended / DIY",
    image: "/products/hydro-dip-kit.webp",
    description: "The complete HGI combo pack used for carbon fiber hydro dipping. Includes premium CF074B twill carbon film, dedicated aerosol activator, basecoat, and high-gloss protective topcoat.",
    features: [
      "CF074B Carbon Fiber Film Roll (0.5m x 3m)",
      "400ml Specialized Aerosol Activator",
      "400ml Basecoat + 400ml High-Gloss Topcoat",
      "Perfect for ABS plastics, fairings, mirror cowls & helmets"
    ],
    externalUrl: "https://www.hydrographicsindia.com/products/c1ccad9de8/1203795000002781321",
    sourceLabel: "Hydro Graphics India"
  },
  {
    id: "iftex-clean-system-23",
    name: "IFTEX Clean System 23",
    tagline: "Concentrated petrol additive with built-in measuring dispenser",
    category: "Maintenance",
    badge: "Essential / Every Tank",
    image: "/products/iftex-clean-system-23.png",
    description: "The fuel system detergent I use on every single tank full to dissolve ethanol gum, prevent engine knocking, and keep fuel injectors atomizing cleanly.",
    features: [
      "Built-in top measuring dispenser chamber",
      "Used on every tank full (1 ml per 1 Liter petrol)",
      "Cleans fuel injectors, intake valves & spark plugs",
      "Eliminates engine knocking & counteracts ethanol moisture"
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
    image: "/products/yoshimura-alpha-t.png",
    description: "Delivers a deeper, throatier inline-four acoustic character while shaving unsprung weight and retaining the factory catalytic converter and sensors.",
    features: [
      "Works finish stainless steel canister",
      "Carbon fiber end cap & carbon heat shield",
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
