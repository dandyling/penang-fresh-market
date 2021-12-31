import { StrapiResponse } from "./Response";

export interface Category {
  id: string;
  attributes: {
    name: string;
  };
}

export interface CategoryResponse extends StrapiResponse {
  data: Category[];
}
