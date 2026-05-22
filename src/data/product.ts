import img1 from "@/assets/product-1.jpg";
import img2 from "@/assets/product-2.jpg";
import img3 from "@/assets/product-3.jpg";
import img4 from "@/assets/product-4.jpg";

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

export type Product = {
  id: string;
  brand: string;
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  inStock: boolean;
  images: { src: string; alt: string }[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
};

export const product: Product = {
  id: "atlas-runner-01",
  brand: "Northbound",
  title: "Atlas Runner — Everyday Trainer",
  rating: 4.6,
  reviewCount: 1284,
  price: 129,
  originalPrice: 189,
  inStock: true,
  images: [
    { src: img1, alt: "Atlas Runner three-quarter view" },
    { src: img2, alt: "Atlas Runner side profile" },
    { src: img3, alt: "Atlas Runner top down" },
    { src: img4, alt: "Atlas Runner heel detail" },
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Sandstone", hex: "#d4a574" },
    { name: "Cloud", hex: "#f1efe9" },
    { name: "Slate", hex: "#3a3a3a" },
    { name: "Olive", hex: "#6b7a4d" },
  ],
  description:
    "The Atlas Runner is built for long days on hard ground. A breathable engineered upper sits over a dual-density foam midsole, giving you a soft landing and a confident push-off. Designed in our Portland studio, tested on six continents.",
  features: [
    "Recycled engineered mesh upper",
    "Dual-density EVA midsole with energy return",
    "Sustainably sourced natural rubber outsole",
    "Removable Ortholite® insole",
    "Lace-up closure with reinforced heel cup",
  ],
  specs: [
    { label: "Weight", value: "248g (size M)" },
    { label: "Drop", value: "8mm" },
    { label: "Upper", value: "Recycled mesh / nubuck" },
    { label: "Outsole", value: "Natural rubber" },
    { label: "Made in", value: "Portugal" },
    { label: "SKU", value: "NB-ATL-01" },
  ],
};

export const initialReviews: Review[] = [
  {
    id: "r1",
    name: "Maya P.",
    rating: 5,
    date: "Mar 12, 2026",
    comment:
      "Honestly the most comfortable trainer I've owned in years. Wore them for an 8-hour airport day and my feet were fine.",
  },
  {
    id: "r2",
    name: "Daniel K.",
    rating: 4,
    date: "Feb 28, 2026",
    comment: "Beautiful build quality. Sizing runs a touch large — I'd size down half if you're between.",
  },
  {
    id: "r3",
    name: "Sofia R.",
    rating: 5,
    date: "Feb 4, 2026",
    comment: "The sandstone colorway is even better in person. Matches everything in my wardrobe.",
  },
];
