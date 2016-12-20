import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavBarComponent } from './nav-bar.component';

@Component({
  selector: 'my-app',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent { 
  
}
