export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Our most popular items",
    image: "https://picsum.photos/seed/bestsellers-cat/600/400",
    productCount: 1,
    subcategories: ["Top Picks"],
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    description: "Premium menswear & accessories",
    image: "https://picsum.photos/seed/men-cat/600/400",
    productCount: 20,
    subcategories: ["T-Shirts", "Shirts", "Trousers", "Jackets", "Accessories"],
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    description: "Curated womenswear collection",
    image: "https://picsum.photos/seed/women-cat/600/400",
    productCount: 20,
    subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"],
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    description: "Fun & comfortable kidswear",
    image: "https://picsum.photos/seed/kids-cat/600/400",
    productCount: 18,
    subcategories: ["Boys", "Girls", "Unisex", "School Wear"],
  },
  {
    id: "home",
    name: "Home",
    slug: "home",
    description: "Elevate your living space",
    image: "https://picsum.photos/seed/home-cat/600/400",
    productCount: 22,
    subcategories: ["Furniture", "Lighting", "Decor", "Storage", "Kitchen"],
  },
  {
    id: "ikea",
    name: "IKEA",
    slug: "ikea",
    description: "Exclusive IKEA deals & finds",
    image: "https://picsum.photos/seed/ikea-cat/600/400",
    productCount: 15,
    subcategories: ["Furniture", "Storage", "Lighting", "Outdoor", "Kitchen"],
  },
  {
    id: "our-products",
    name: "Our Products",
    slug: "our-products",
    description: "Handpicked bymoe originals",
    image: "https://picsum.photos/seed/ourproducts-cat/600/400",
    productCount: 12,
    subcategories: ["Essentials", "Limited Edition", "Bestsellers"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
