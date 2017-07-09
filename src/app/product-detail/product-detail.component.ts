import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductCart } from '../models/product-cart';


import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../services/product.service';

import { CartService } from '../services/cart.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    providers: [ProductService,CartService]
})

export class ProductDetailComponent implements OnInit {
    product: Product;


    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    getProduct(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('pid')))
            .subscribe(product => {this.product = product});
    }

    ngOnInit(): void {
        this.getProduct();
    }

    goBack(): void {
        this.location.back();
    }

    addToCart(item : Product){
        let productCart : ProductCart = new ProductCart;
        productCart.id = item.id;
        // TODO :set variant Id
        productCart.variantId = item.id; 
        productCart.qty = 1; 
        this.cartService.addItem(productCart);
    }
    getCart(){
      console.log(this.cartService.getAllItems());
    }

}
