import { atom, selector } from "recoil";
import { isServer } from "../../utils/utils";
import { Product } from "../product/Product";

export interface Order extends Product {
  quantity: number;
}

export const ordersState = atom<Order[]>({
  key: "ordersState",
  default: !isServer ? JSON.parse(localStorage.getItem("orders") ?? "[]") : [],
});

const ordersSubState = selector<number[]>({
  key: "ordersSubState",
  get: ({ get }) => {
    const orders = get(ordersState);
    return orders.map((o) => o.attributes.price * o.quantity);
  },
});

export const ordersTotalState = selector<number>({
  key: "ordersTotalState",
  get: ({ get }) => {
    const ordersSub = get(ordersSubState);
    return ordersSub.reduce((total, s) => {
      return (total += s);
    }, 0);
  },
});
