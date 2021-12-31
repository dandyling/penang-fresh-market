import { Category } from "./Category";
import { StrapiResponse } from "./Response";

export interface Product {
  id: number;
  attributes: {
    name: string;
    label: string;
    description: string;
    category: {
      data: Category;
    };
    price: number;
    price_label: string;
    picture: {
      data: {
        id: number;
        attributes: {
          formats: {
            small: Image;
            thumbnail: Image;
          };
        };
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
  };
}

interface Image {
  url: string;
}

export interface ProductResponse extends StrapiResponse {
  data: Product[];
}
