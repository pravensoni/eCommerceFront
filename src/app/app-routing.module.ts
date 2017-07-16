import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartDetailComponent } from './cart/cart-detail.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomepageComponent
    },
    {
        path: 'product/:pid',
        component: ProductDetailComponent
    },
    {
        path: 'cart',
        component: CartDetailComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }