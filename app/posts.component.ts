import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post';

import { AjaxService } from './ajax.service';

@Component({
    template: ` <h1> Posts </h1>
        
    
    <div class="container-fluid">
      <div class="row">
        <div class="column col-sm-6">
        <spinner [visible]="isLoading"> </spinner>
          <ul class="list-group">
            <li *ngFor="let post of _posts"
                        class="list-group-item">{{ post.title }}
            </li>
          </ul>
        </div> <!-- column>
      </div> <!-- row -->
    </div>
    `
})
export class PostsComponent implements OnInit, OnDestroy { 
    _posts: Post[];

    _url = "http://jsonplaceholder.typicode.com/posts";

    subscription;
    isLoading = true;

    constructor(private _ajaxService: AjaxService) { }

    ngOnInit() {
       this.getPosts();
    }

    ngOnDestroy() {

    }

    getPosts() {
        this._ajaxService.get(this._url).subscribe(
            response => {
                this.isLoading = false;
                this._posts = <Post[]>response;
            }
        ), error => console.log(error)
        , () => {} // completed
    }
    

}