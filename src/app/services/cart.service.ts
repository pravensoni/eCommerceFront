import { Injectable } from '@angular/core';
import { ProductCart } from '../models/product-cart';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';




@Injectable()
export class CartService {

    constructor(private _cookieService: CookieService) { }


    getCookie(key: string) : ProductCart[] {
        return this._cookieService.getObject(key) as ProductCart[];
    }
    setCookie(products : ProductCart[]){
        this._cookieService.putObject('cart',products);
    }

    addItem(item: ProductCart) {
        let products : ProductCart[] = this.getCookie('cart');
        if(typeof products  == 'undefined'){
            products = []
        }
        let productCart : ProductCart = products.find(product => product.id===item.id && product.variantId === item.variantId);
        let index : number = products.findIndex(product => product.id===item.id && product.variantId === item.variantId);
        if(typeof productCart != 'undefined'){
            this._cookieService.removeAll();     
            item.qty+=productCart.qty;
            productCart.qty = item.qty;
            products[index] = productCart;
        }else {
        products.push(item);
        }
        this.setCookie(products);
    }
    removeItem(item: ProductCart) {
        let products : ProductCart[] = this.getCookie('cart');
        //let productCart : ProductCart = products.find(product => product.id===item.id && product.variantId === item.variantId);
        let index : number = products.findIndex(product => product.id===item.id && product.variantId === item.variantId);
        products.splice(index,1);
        this.setCookie(products);
    }

    getAllItems() : ProductCart[] {
       let products : ProductCart[] = this.getCookie('cart');
       return products;
        //this._cookieService.removeAll();
    }

}