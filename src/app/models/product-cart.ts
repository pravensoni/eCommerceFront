import { Product } from '../models/product';

export class ProductCart {
  id: number;
  variantId : number;
  qty : number;
  product :Product;
  variantName: string;
}