export interface MaterialDetail {
  name: string;
  description: string;
  xPercentage: number;
  yPercentage: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  descriptor: string;
  price: number;
  currency: string;
  tag?: string;
  description: string;
  details: string[];
  images: {
    primary: string;
    secondary: string;
    gallery: string[];
  };
  materials: string[];
  sizes: { code: string; label: string; dimensions: string; priceMultiplier: number }[];
  colors: { code: string; name: string; hex: string }[];
  hotspots?: MaterialDetail[];
  dimensions: string;
  careInstructions: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "bear-bed",
    slug: "bear-bed",
    name: "The Bear Bed",
    descriptor: "Tactile Bouclé Lounge Nest",
    price: 380,
    currency: "EUR",
    tag: "SIGNATURE CONCEPT",
    description:
      "Crafted for uncompromised canine rest and modern architectural interiors. The Bear Bed features a plush, textured bouclé wool cover resting upon an ergonomic supportive foam core.",
    details: [
      "Custom bouclé wool blend weave — tactile & machine washable",
      "Ergonomic supportive foam core designed for deep rest",
      "Saddle-stitched leather handle detailing",
      "Concealed heavy-duty brass zippers",
      "Non-slip taupe micro-suede base",
    ],
    images: {
      primary: "/images/products/bear_bed.jpg",
      secondary: "/images/products/bear_bed_alt.jpg",
      gallery: [
        "/images/products/bear_bed.jpg",
        "/images/products/bear_bed_alt.jpg",
        "/images/lifestyle/for_them.jpg",
      ],
    },
    materials: ["Italian Bouclé Wool Blend", "Supportive Comfort Foam", "Natural Calf Leather"],
    sizes: [
      { code: "S", label: "Small", dimensions: "65 × 50 × 18 cm", priceMultiplier: 0.85 },
      { code: "M", label: "Medium", dimensions: "85 × 70 × 20 cm", priceMultiplier: 1.0 },
      { code: "L", label: "Large", dimensions: "110 × 90 × 22 cm", priceMultiplier: 1.25 },
    ],
    colors: [
      { code: "ivory", name: "Warm Ivory", hex: "#F4F0E8" },
      { code: "sand", name: "Soft Sand", hex: "#E7DED0" },
      { code: "charcoal", name: "Deep Charcoal", hex: "#242321" },
    ],
    hotspots: [
      {
        name: "Tactile Bouclé Weave",
        description: "Custom spun yarn optimized for breathability and daily comfort.",
        xPercentage: 42,
        yPercentage: 38,
      },
      {
        name: "Ergonomic Bolster",
        description: "Contoured wall height supporting natural head resting posture.",
        xPercentage: 75,
        yPercentage: 48,
      },
      {
        name: "Supportive Core",
        description: "Pressure-relieving foam layer supporting natural joint alignment.",
        xPercentage: 55,
        yPercentage: 68,
      },
    ],
    dimensions: "85 × 70 × 20 cm (Medium)",
    careInstructions: "Machine wash outer cover at 30°C delicate cycle. Line dry.",
  },
  {
    id: "cloud-mat",
    slug: "cloud-mat",
    name: "The Cloud Mat",
    descriptor: "Minimalist Quilted Floor Mat",
    price: 220,
    currency: "EUR",
    tag: "NEW CONCEPT",
    description:
      "A slim, versatile lounge cushion designed to lay gracefully on timber or stone floors. Quilted organic linen channels filled with soft, comforting fill.",
    details: [
      "Stonewashed organic linen outer shell",
      "Channel-quilted stitch pattern prevents fill shifting",
      "Rollable design with integrated canvas binding straps",
      "Pre-shrunk fabric for easy home laundering",
    ],
    images: {
      primary: "/images/products/cloud_mat.jpg",
      secondary: "/images/journal/journal_1.jpg",
      gallery: [
        "/images/products/cloud_mat.jpg",
        "/images/journal/journal_1.jpg",
        "/images/materials/boucle.jpg",
      ],
    },
    materials: ["Stonewashed Organic Linen", "Comfort Cushioning", "Brass Buckles"],
    sizes: [
      { code: "S", label: "Small", dimensions: "70 × 50 × 5 cm", priceMultiplier: 0.8 },
      { code: "M", label: "Medium", dimensions: "95 × 70 × 5 cm", priceMultiplier: 1.0 },
      { code: "L", label: "Large", dimensions: "120 × 85 × 6 cm", priceMultiplier: 1.2 },
    ],
    colors: [
      { code: "sand", name: "Soft Sand", hex: "#E7DED0" },
      { code: "taupe", name: "Warm Taupe", hex: "#D6CEC2" },
      { code: "terracotta", name: "Terracotta Accent", hex: "#A56F55" },
    ],
    dimensions: "95 × 70 × 5 cm (Medium)",
    careInstructions: "Machine wash cold with mild detergent. Tumble dry on gentle low heat.",
  },
  {
    id: "arch-nest",
    slug: "arch-nest",
    name: "The Arch Nest",
    descriptor: "Sculptural Bolster Bed",
    price: 460,
    currency: "EUR",
    description:
      "An architectural centerpiece for modern living rooms. The Arch Nest combines a structured terracotta canvas surround with a dense organic taupe cotton inner pillow.",
    details: [
      "Architectural curved perimeter providing security and chin support",
      "Heavyweight organic cotton canvas shell",
      "Protective soil-resistant coating",
      "Dual removable cushion system",
    ],
    images: {
      primary: "/images/products/arch_nest.jpg",
      secondary: "/images/lifestyle/for_home.jpg",
      gallery: [
        "/images/products/arch_nest.jpg",
        "/images/lifestyle/for_home.jpg",
        "/images/products/bear_bed.jpg",
      ],
    },
    materials: ["Heavyweight Organic Canvas", "Plush Comfort Fill", "Brass Plaque"],
    sizes: [
      { code: "M", label: "Medium", dimensions: "90 × 75 × 25 cm", priceMultiplier: 1.0 },
      { code: "L", label: "Large", dimensions: "115 × 95 × 28 cm", priceMultiplier: 1.3 },
    ],
    colors: [
      { code: "terracotta", name: "Terracotta / Taupe", hex: "#A56F55" },
      { code: "espresso", name: "Espresso", hex: "#24211E" },
    ],
    dimensions: "90 × 75 × 25 cm (Medium)",
    careInstructions: "Spot clean canvas shell. Removable cushion cover is machine washable.",
  },
  {
    id: "studio-cushion",
    slug: "studio-cushion",
    name: "The Studio Cushion",
    descriptor: "Heavy Linen Orthopedic Bed",
    price: 340,
    currency: "EUR",
    tag: "LIMITED CONCEPT",
    description:
      "Designed for urban lofts and open-plan spaces. Wrapped in deep espresso linen with saddle-stitched leather carrying straps.",
    details: [
      "Deep Charcoal & Espresso yarn-dyed linen blend",
      "Reinforced double-needle topstitching",
      "Layered supportive foam core",
      "Natural leather side carry handles",
    ],
    images: {
      primary: "/images/products/studio_cushion.jpg",
      secondary: "/images/journal/journal_3.jpg",
      gallery: [
        "/images/products/studio_cushion.jpg",
        "/images/journal/journal_3.jpg",
        "/images/lifestyle/for_them.jpg",
      ],
    },
    materials: ["Yarn-dyed Linen Blend", "Supportive Foam Core", "Natural Leather"],
    sizes: [
      { code: "M", label: "Medium", dimensions: "85 × 65 × 16 cm", priceMultiplier: 1.0 },
      { code: "L", label: "Large", dimensions: "110 × 85 × 18 cm", priceMultiplier: 1.25 },
    ],
    colors: [
      { code: "charcoal", name: "Deep Charcoal", hex: "#242321" },
      { code: "espresso", name: "Espresso", hex: "#24211E" },
    ],
    dimensions: "85 × 65 × 16 cm (Medium)",
    careInstructions: "Dry clean recommended for leather-trimmed outer cover.",
  },
];
