import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Variant } from '../models/variant';
import { Order } from '../models/order';
import { ProductCart } from '../models/product-cart';
import * as Collections from 'typescript-collections';
import { CustomerInfo } from "../models/customerInfo";


import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../services/product.service';

import { CartService } from '../services/cart.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'order-placed',
    templateUrl: './order-placed.component.html',
    styleUrls: ['./order-placed.component.css'],
    providers: [ProductService, CartService]
})

export class OrderPlacedComponent implements OnInit {
    order: Order;
    subTotal: number = 0;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    getOrder(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.productService.getOrder((params.get('oid')))
                ).subscribe(order=> {
                    this.order = order;
                })

                
    }

    ngOnInit(): void {
        this.getOrder();
        
    }








}
