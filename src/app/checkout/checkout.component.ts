import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductCart } from '../models/product-cart';
import * as Collections from 'typescript-collections';
import { CustomerInfo } from "../models/customerInfo";


import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../services/product.service';

import { CartService } from '../services/cart.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    providers: [ProductService, CartService]
})

export class CheckoutComponent implements OnInit {
    products: Product[] = new Array<Product>();
    cartProducts: ProductCart[];
    totVarType: string[];
    subTotal: number = 0;
    public alerts: any = [];
    cusInfo: CustomerInfo = new CustomerInfo;
    states: string[] = ['Andaman and Nicobar', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    public status: any = {
        isFirstOpen: true,
        isFirstDisabled: false
    };


    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    getProducts(): void {

        this.cartProducts = this.cartService.getAllItems();
        this.subTotal = 0;
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
    }
    removeItem(item: ProductCart) {
        this.cartService.removeItem(item);
        window.location.reload();
    }

    ngOnInit(): void {
        //this.getProducts();
    }

    getOrderInfo(): void {
        this.getProducts();
    }


 
placeOrder() : boolean {
    let orderPlaced :boolean = false;
    console.log(JSON.stringify(this.cusInfo));
     return orderPlaced;
}



}
