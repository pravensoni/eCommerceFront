import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { Headers, Http } from '@angular/http';
import { CustomerInfo } from "../models/customerInfo";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class ProductService {

    //private productUrl = 'http://13.126.36.80/webs/product/';
    //private orderUrl = 'http://13.126.36.80/webs/order/';
    
    private productUrl = 'http://localhost:8080/product/';
    private orderUrl = 'http://localhost:8080/order/';

    constructor(private http: Http) { }

    getHomePageProducts(): Promise<Product[]> {
        return this.http.get(this.productUrl+"homepage/"+1)
            .toPromise()
            .then(response => response.json() as Product[])
            .catch(this.handleError);
    }

    getProduct(pid: number): Promise<Product> {
        return this.http.get(this.productUrl+pid)
            .toPromise()
            .then(response => response.json() as Product)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    placeOrder(customerInfo:CustomerInfo,products : Product[],paymentType:string,subTotal:number) : Promise<Order>{
        let order :Order = new Order;
        order.products = products;
        order.customerInfo = customerInfo;
        order.paymentType = paymentType;
        order.subTotal = subTotal;
        return this.http.post(this.orderUrl,order).toPromise().then(response => response.json() as Order);
    }

    getOrder(dispOrderId:string) : Promise<Order>{
        return this.http.get(this.orderUrl+dispOrderId).toPromise().then(response => response.json() as Order);
    }

}