import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'track-order',
  templateUrl:'./track-order.component.html' ,
  providers: [ProductService]
})
export class TrackOrderComponent { 
  dispOrderId:string;
  orderStatus:string;
  public alerts: any = [];

      constructor(
        private productService: ProductService
    ) { }

  checkStatus(){
    this.productService.getOrderStatus(this.dispOrderId).then(orderStatus=>{
      this.orderStatus = orderStatus;

    }
    );
  }

}