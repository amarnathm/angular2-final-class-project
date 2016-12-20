import { Component , Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveLinkSRComponent } from './active-link-sr.component';

@Component({
    selector: 'nav-bar',
    template: `

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a 
                class="navbar-brand" 
                [class.active]="isCurrentlyActive('home')" 
                routerLink="">
                    ngProject
                    <active-link-sr [isActive]="isCurrentlyActive('home')"></active-link-sr> 
            </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li 
                    [class.active]="isCurrentlyActive('users')" >
                    <a routerLink="users">Users 
                        <active-link-sr [isActive]="isCurrentlyActive('users')"></active-link-sr>
                    </a>
                </li>
                <li 
                    [class.active]="isCurrentlyActive('posts')" >
                    <a routerLink="posts">Posts
                        <active-link-sr [isActive]="isCurrentlyActive('posts')"></active-link-sr>
                    </a>
                </li>
            </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    `
})
export class NavBarComponent {

    @Input() activeClass: string;

    constructor(private _router: Router) { }
    
    isCurrentlyActive(path) {
        // params: (path, isExact)
        if (this._router.isActive(path, true)) {
            return true;
        }
        else return false;
    }
    

}