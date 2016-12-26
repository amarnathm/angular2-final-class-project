import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user.component';
import { PostsComponent } from './posts.component';
import { PostDetailComponent } from './post-detail.component';
import { CommentsComponent } from './comments.component';
import { NavBarComponent } from './nav-bar.component';
import { ActiveLinkSRComponent } from './active-link-sr.component';
import { AjaxService } from './ajax.service';
import { ConfirmDeactivate } from './confirm-deactivate.service';
import { IHasChanges } from './has-changes.interface';
import { PaginationComponent } from './pagination.component';


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
    SpinnerComponent,
    HomeComponent,
    NotFoundComponent,
    UsersComponent,
    PostsComponent,
    NavBarComponent,
    ActiveLinkSRComponent,
    AddUserComponent,
    PostDetailComponent,
    CommentsComponent,
    PaginationComponent,
    
    
  ],
  providers: [AjaxService, ConfirmDeactivate ] ,
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
