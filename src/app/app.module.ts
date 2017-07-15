import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AboutUsComponent} from './about-us/about-us.component';
import { AppRoutingModule }   from './app-routing.module';
import { HttpModule }    from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { CarouselModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';4
import { CartDetailComponent } from './cart/cart-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    HomepageComponent,
    AboutUsComponent,
    ContactUsComponent,
    EscapeHtmlPipe,
    CartDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    CookieModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


