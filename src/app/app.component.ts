import { Component } from '@angular/core';
import {Product} from './models/product';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'praveen\'s app';
products = homePageProducts;
selectedProduct : Product;
onSelect(product: Product): void {
  this.selectedProduct = product;
}
}

const homePageProducts : Product[] = [
{
    id:1,
    title: 'fidget cube test',
  price: 549,
  origPrice: 999,
  description: 'test decription',
  imageLink: 'test image link'

},
{
    id:2,
    title: 'fidget cube case',
  price: 149,
  origPrice: 599,
  description: 'test decription',
  imageLink: 'test image link'

  }
]




