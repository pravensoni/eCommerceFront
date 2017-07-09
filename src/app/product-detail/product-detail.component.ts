import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';


import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../product.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    providers: [ProductService]
})

export class ProductDetailComponent implements OnInit {
    product: Product;


    constructor(
        private productService: ProductService,
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

}
