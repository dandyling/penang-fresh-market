import { Product } from "./Product";

export interface Order extends Product {
  quantity: number;
}
