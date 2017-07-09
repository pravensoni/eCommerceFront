import { Injectable } from '@angular/core';
import { homePageProducts } from './models/mock-products';
import { Product } from './models/product';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class ProductService {

    private productUrl = 'http://localhost:8080/product/';

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

}