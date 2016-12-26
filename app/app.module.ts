import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/post-detail.component';
import { CommentsComponent } from './posts/comments.component';
import { NavBarComponent } from './nav-bar.component';
import { ActiveLinkSRComponent } from './active-link-sr.component';
import { AjaxService } from './shared/ajax.service';
import { ConfirmDeactivate } from './shared/confirm-deactivate.service';
import { IHasChanges } from './shared/has-changes.interface';
import { PaginationComponent } from './shared/pagination.component';


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
