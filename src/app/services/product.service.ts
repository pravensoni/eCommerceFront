import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { Headers, Http,URLSearchParams } from '@angular/http';
import { CustomerInfo } from "../models/customerInfo";
import 'rxjs/add/operator/toPromise';



@Injectable()
export class ProductService {

    //private productUrl = 'http://13.126.126.15/webs/product/';
    //private orderUrl = 'http://13.126.126.15/webs/order/';
    //private mailUrl = 'http://13.126.126.15/webs/mail/';

    private productUrl = 'http://localhost:8080/product/';
    private orderUrl = 'http://localhost:8080/order/';
    private mailUrl = 'http://localhost:8080/mail/';

    constructor(private http: Http) { }

    getHomePageProducts(): Promise<Product[]> {
        return this.http.get(this.productUrl + "homepage/" + 1)
            .toPromise()
            .then(response => response.json() as Product[])
            .catch(this.handleError);
    }

    getProduct(pid: number): Promise<Product> {
        return this.http.get(this.productUrl + pid)
            .toPromise()
            .then(response => response.json() as Product)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    placeOrder(customerInfo: CustomerInfo, products: Product[], paymentType: string, subTotal: number): Promise<Order> {
        let order: Order = new Order;
        order.products = products;
        order.customerInfo = customerInfo;
        order.paymentType = paymentType;
        order.subTotal = subTotal;
        return this.http.post(this.orderUrl, order).toPromise().then(response => response.json() as Order);
    }

    getOrder(dispOrderId: string): Promise<Order> {
        return this.http.get(this.orderUrl + dispOrderId).toPromise().then(response => response.json() as Order);
    }

    sendEmail(name: string, email: string, phone: string, message: string): Promise<string> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('phone', phone);
        params.set('email', email);
        params.set('message', message);
        let promise = this.http.get(this.mailUrl, { search: params }).toPromise().then(response => response.toString());
        return promise;
    }
    getOrderStatus(dispOrderId: string): Promise<string> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('dispOrderId', dispOrderId);
        let promise = this.http.get(this.orderUrl+"status", { search: params }).toPromise().then(orderStatus => orderStatus.text() as string);
        return promise;
    }

}