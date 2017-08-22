import { Component, Input } from '@angular/core';
import { AfterViewChecked, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Variant } from '../models/variant';
import { ProductCart } from '../models/product-cart';
import * as Collections from 'typescript-collections';
import { CustomerInfo } from "../models/customerInfo";
import { Order } from "../models/order";
import { PayInfo } from "../models/payInfo";
import { Router } from "@angular/router";


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

export class CheckoutComponent implements OnInit, AfterViewChecked {
    products: Product[] = new Array<Product>();
    cartProducts: ProductCart[];
    paymentType: string = '';
    totVarType: string[];
    subTotal: number = 0;
    public alerts: any = [];
    cusInfo: CustomerInfo = new CustomerInfo;
    payInfo: PayInfo = new PayInfo();
    payForm;
    placeOrderBtnClicked:boolean= false;
    states: string[] = ['Andaman and Nicobar', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    public status: any = {
        isFirstOpen: true,
        isFirstDisabled: false
    };


    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router
    ) { }

    getProducts(): void {

        this.cartProducts = this.cartService.getAllItems();
        this.subTotal = 0;
        for (let cartProduct of this.cartProducts) {
            this.productService.getProduct(cartProduct.id).then(product => {
                cartProduct.product = product;
                this.subTotal += product.price * cartProduct.qty;
                for (let variant of product.variants) {
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
        this.getProducts();
    }



    placeOrder(payForm): boolean {
        this.placeOrderBtnClicked = true;
        let orderPlaced: boolean = false;
        let products: Product[] = new Array<Product>();
        let order: Order = new Order();



        for (let productCart of this.cartProducts) {
            let product: Product = new Product();
            
            product.id = productCart.product.id;
            product.title = productCart.product.title;
            product.price = productCart.product.price;
            product.imageLinks = new Array();
            product.imageLinks.push(productCart.product.imageLinks[0]);
            if(productCart.variantId != undefined){
            let variant: Variant = new Variant();
            variant.id = productCart.variantId;
            variant.variantName = productCart.variantName;
            variant.qty = productCart.qty;
            product.variants = new Array<Variant>();
            product.variants.push(variant);
            }
            
            product.qty = productCart.qty;
            products.push(product);
        }

        this.productService.placeOrder(this.cusInfo, products, this.paymentType, this.subTotal).then(order => {
            this.cartService.clearCart();
            this.payInfo = order.payInfo; 
            this.payForm = payForm;
            if (this.paymentType == "COD") {
                this.router.navigate(['/order/' + order.dispOrderId]);
            }
        });
        return orderPlaced;
    }



    // Beware! Called frequently!
    // Called in every change detection cycle anywhere on the page
    ngAfterViewChecked() {
        if (this.payForm && this.paymentType == "ONLINE") {
            this.payForm.submit();
        }
    }

}
