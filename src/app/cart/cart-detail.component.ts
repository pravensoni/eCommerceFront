import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductCart } from '../models/product-cart';
import * as Collections from 'typescript-collections';


import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../services/product.service';

import { CartService } from '../services/cart.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'cart-detail',
    templateUrl: './cart-detail.component.html',
    styleUrls:['./cart-detail.component.css'],
    providers: [ProductService,CartService]
})

export class CartDetailComponent implements OnInit {
    products: Product[] = new Array<Product>();
    cartProducts: ProductCart[];
    totVarType : string[];
    public alerts: any = [];


    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    getProducts(): void {
      let cartProducts = this.cartService.getAllItems();
      this.cartProducts = cartProducts;
      for(let cartProduct of cartProducts){
        this.productService.getProduct(cartProduct.id).then(product => this.products.push(product));
      }
    }


    ngOnInit(): void {
        this.getProducts();
    }



}
