export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  image: string;
  description: string;
  features: string[];
  externalUrl?: string;
  whatsappMessage?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "diy-hydro-dip",
    name: "DIY Hydro Dip",
    tagline: "Professional water transfer printing for motorcycle parts & gear",
    category: "DIY & Custom",
    price: "₹1,499",
    originalPrice: "₹2,299",
    badge: "Featured / DIY",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    description: "Custom hydrographic water transfer printing kit designed for DIY builders. Give your motorcycle panels, tank pads, mirror caps, and helmets an ultra-premium carbon fiber or custom pattern finish with high durability.",
    features: [
      "Premium Carbon Fiber / Marble Hydro Dip Film",
      "Specialized Activator Aerosol included",
      "Heat & UV resistant high-gloss clear coat finish",
      "Full step-by-step video tutorial by Moe",
      "Perfect for ABS plastics, metals & fiberglass"
    ],
    externalUrl: "https://chat.whatsapp.com/ENrb0phc8sT32tMnwnoqiw?s=cl&p=i&mlu=0",
    whatsappMessage: "Hey Moe, I want to order the DIY Hydro Dip kit!"
  },
  {
    id: "yoshimura-exhaust",
    name: "Yoshimura Alpha T Slip-On Exhaust",
    tagline: "Unleash the raw inline-4 roar with street legal compliance",
    category: "Performance",
    price: "₹68,500",
    badge: "Sound Mod",
    image: "https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop",
    description: "Gives the motorcycle a deep, throaty exhaust note while keeping stock headers intact with noticeable weight reduction.",
    features: [
      "Works finish stainless steel canister",
      "Carbon fiber end cap",
      "Direct slip-on bolt-on installation"
    ],
    externalUrl: "https://superbikestore.in/products/yoshimura-alpha-t-works-street-slip-on-exhaust-for-kawasaki-z900-2020"
  },
  {
    id: "frame-slider-protection",
    name: "Heavy-Duty Frame Slider Set",
    tagline: "Maximum chassis and engine protection against drops & slides",
    category: "Protection",
    price: "₹12,499",
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
    description: "High-impact Delrin pucks with CNC machined aircraft-grade aluminum brackets.",
    features: [
      "No-cut fairing direct mounting",
      "Replaceable Delrin slider pucks",
      "Anodized black finish"
    ],
    externalUrl: "https://www.kawasaki.com"
  },
  {
    id: "quick-turn-fuel-cap",
    name: "Quick-Turn CNC Fuel Cap",
    tagline: "Keyless quick-release aircraft style fuel filler cap",
    category: "Styling",
    price: "₹7,999",
    badge: "Cosmetic",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop",
    description: "CNC machined keyless fuel cap for fast track-side and street refuels with a stealth aesthetic.",
    features: [
      "1/4 turn twist-lock mechanism",
      "Leak-proof viton O-ring seal",
      "Laser etched branding"
    ],
    externalUrl: "https://www.motodracing.com"
  }
];
