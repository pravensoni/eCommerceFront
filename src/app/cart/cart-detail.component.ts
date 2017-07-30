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
    styleUrls: ['./cart-detail.component.css'],
    providers: [ProductService, CartService]
})

export class CartDetailComponent implements OnInit {
    products: Product[] = new Array<Product>();
    cartProducts: ProductCart[];
    totVarType: string[];
    subTotal: number = 0;
    public alerts: any = [];
    emptyCart: boolean;


    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    getProducts(): void {

        this.cartProducts = this.cartService.getAllItems();
        if (this.cartProducts) {
            for (let cartProduct of this.cartProducts) {
                this.productService.getProduct(cartProduct.id).then(product => {
                    cartProduct.product = product;
                    this.subTotal += product.price * cartProduct.qty;
                    for (let variant of product.variants) {
                        console.log(cartProduct.variantId);
                        if (variant.id == cartProduct.variantId) {
                            cartProduct.variantName = variant.variantName;
                        }
                    }
                });

            }
            this.emptyCart = false;
        }else{
            this.emptyCart = true;
        }
    }
    removeItem(item: ProductCart) {
        this.cartService.removeItem(item);
        window.location.reload();
    }

    ngOnInit(): void {
        this.getProducts();

    }



}
