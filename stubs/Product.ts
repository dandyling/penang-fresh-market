interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  unit:
    | "kg"
    | "gram"
    | "pcs"
    | "pac"
    | "box"
    | "bunch"
    | "nos"
    | "can"
    | "bottle"
    | "tray";
}
export const products: Product[] = [
  {
    id: "PK001",
    name: "Pork Ribs (排骨)",
    description: "PK001",
    price: 24,
    unit: "kg",
    imageUrl:
      "https://res.cloudinary.com/dpyg8gfqr/image/upload/v1634210494/fresh-mart/pork_ribs.jpg",
  },
  {
    id: "PK005",
    name: "Roasted Pork (烧肉)",
    description: "PK005",
    price: 26,
    unit: "kg",
    imageUrl:
      "https://res.cloudinary.com/dpyg8gfqr/image/upload/v1634210494/fresh-mart/pork_ribs.jpg",
  },
  {
    id: "PK008",
    name: "Pork Ribs (排骨)",
    description: "PK008",
    price: 24,
    unit: "kg",
    imageUrl:
      "https://res.cloudinary.com/dpyg8gfqr/image/upload/v1634210494/fresh-mart/pork_ribs.jpg",
  },
];
