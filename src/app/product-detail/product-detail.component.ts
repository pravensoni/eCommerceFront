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
    imageLink:string;
    totVarType : string[];
    public alerts: any = [];
    selectedVar;
    qty:number = 1;

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
                let varDefaultSet:boolean = false;
                this.imageLink = product.imageLinks[0];
                for(let variant of product.variants){
                    totVarType.add(variant.variantType);
                    if(!varDefaultSet){
                    this.selectedVar = variant.id;
                    varDefaultSet=true;
                    }
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

    addToCart(item : Product,varId:number){
        let productCart : ProductCart = new ProductCart;
        productCart.id = item.id;
        productCart.variantId = varId; 
        productCart.qty = Number(this.qty);
        console.log(this.qty); 
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

  changeImage(imageLink:string){
      this.imageLink = imageLink;
  }

}
