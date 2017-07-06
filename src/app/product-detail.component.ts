import {Component,Input} from '@angular/core';
import {Product} from './models/product';

@Component({
    selector:'product-detail',
    templateUrl : './html/product-detail.component.html'
})

export class ProductDetailComponent{
@Input() product:Product;
}
