import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';




@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../app.component.css'],
  providers: [ProductService],
})
export class HomepageComponent implements OnInit{
  title = 'praveen\'s app';
  products : Product[];
selectedProduct : Product;
constructor(private productService: ProductService) { }
onSelect(product: Product): void {
  this.selectedProduct = product;
}
getHomePageProducts() : void {
   this.productService.getHomePageProducts().then(products => this.products = products);
}
ngOnInit(): void {
  this.getHomePageProducts();
}
}






