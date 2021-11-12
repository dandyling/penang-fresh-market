import { Category } from "./Category";

export interface Product {
  id: number;
  name: string;
  label: string;
  description: string;
  category: Category;
  price: number;
  price_label: string;
  picture: {
    formats: {
      small: Image;
      thumbnail: Image;
    };
  };
  unit:
    | "kg"
    | "gram"
    | "pcs"
    | "pac"
    | "pack"
    | "box"
    | "bunch"
    | "nos"
    | "can"
    | "bottle"
    | "tray";
}

interface Image {
  url: string;
}
