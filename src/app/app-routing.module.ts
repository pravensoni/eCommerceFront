import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './static-pages/about-us.component';
import { RefundPolicyComponent } from './static-pages/refund-policy.component';
import { PrivacyPolicyComponent } from './static-pages/privacy-policy.component';
import { TermsOfServiceComponent } from './static-pages/terms-of-service.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartDetailComponent } from './cart/cart-detail.component';
import { OrderPlacedComponent } from "./order-placed/order-placed.component";
import { RouterModule, Routes } from '@angular/router';
import {TrackOrderComponent} from './track-order/track-order.component';


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
        path: 'order/:oid',
        component: OrderPlacedComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
    {
        path: 'refund-policy',
        component: RefundPolicyComponent
    }, {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    }, {
        path: 'terms-of-service',
        component: TermsOfServiceComponent
    },
    {
        path: 'track-order',
        component: TrackOrderComponent
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