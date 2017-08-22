import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'contact-us',
  templateUrl:'./contact-us.component.html' ,
  providers: [ProductService]
})
export class ContactUsComponent { 
  name:string;
  email:string;
  phone:string;
  message:string;
  public alerts: any = [];

      constructor(
        private productService: ProductService
    ) { }

  sendEmail(){
    this.productService.sendEmail(this.name,this.email,this.phone,this.message).then(test=>{
      this.alertSuccess();
      this.name="";
      this.email="";
      this.phone="";
      this.message="";

    }
    );
  }

alertSuccess(): void {
    this.alerts.push({
      type: 'success',
      msg: `Thanks for contacting us. We'll get back to you as soon as possible.`,
      timeout: 5000
    });
  }

}