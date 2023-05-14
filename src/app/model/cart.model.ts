import { Product } from "./product.model";

export interface Cart {
  _id?: string;
  userId: string;
  products: {
    productId: Product;
    quantity: number;
  }[];
}
