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
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls:['./product-detail.component.css'],
    providers: [ProductService,CartService]
})

export class ProductDetailComponent implements OnInit {
    product: Product;
    totVarType : string[];
    public alerts: any = [];


    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    getProduct(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('pid')))
            .subscribe(product => {
                this.product = product;
                let totVarType = new Collections.Set<string>();
                for(let variant of product.variants){
                    totVarType.add(variant.variantType);
                }
                this.totVarType = totVarType.toArray();
            });
    }


    ngOnInit(): void {
        this.getProduct();
    }

    goBack(): void {
        this.location.back();
    }

    addToCart(item : Product,qty:string){
        let productCart : ProductCart = new ProductCart;
        productCart.id = item.id;
        // TODO :set variant Id
        productCart.variantId = item.id; 
        productCart.qty = Number(qty); 
        this.cartService.addItem(productCart);
        this.alertSuccess();
    }
    getCart(){
      console.log(this.cartService.getAllItems());
    }

      public alertSuccess(): void {
    this.alerts.push({
      type: 'success',
      msg: `The Product Was Succesfully Added To Cart`,
      timeout: 5000
    });
  }

}
