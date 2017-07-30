import {Variant} from './variant'

export class Product {
  id: number;
  title: string;
  price: number;
  origPrice: number;
  description: string;
  imageLinks: string[];
  variants : Variant[];
  qty:number;
}