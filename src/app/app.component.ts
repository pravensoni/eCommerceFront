import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent{
  title = 'praveen\'s app';
  isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }
    closeState() { // click handler
        let bool = this.isIn;
        this.isIn = false; 
    }
}






