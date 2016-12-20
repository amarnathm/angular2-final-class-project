import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './non-found.component';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user.component';
import { PostsComponent } from './posts.component';
import { NavBarComponent } from './nav-bar.component';
import { ActiveLinkSRComponent } from './active-link-sr.component';
import { AjaxService } from './ajax.service';

import { ngProjectRouting } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ngProjectRouting
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    UsersComponent,
    PostsComponent,
    NavBarComponent,
    ActiveLinkSRComponent,
    AddUserComponent,
  ],
  providers: [AjaxService ] ,
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
