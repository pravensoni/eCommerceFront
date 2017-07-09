import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template:`
  <h1>{{title}}</h1>
  <a routerLink="/home">Home</a>
  <a routerLink="/about-us">About Us</a>
  <a routerLink="/contact-us">Contact Us</a>
   <router-outlet></router-outlet>`
})
export class AppComponent{
  title = 'praveen\'s app';
}






