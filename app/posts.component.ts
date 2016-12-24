import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post';

import { AjaxService } from './ajax.service';

@Component({
    template: ` <h1> Posts </h1>
        
    
    <div class="container-fluid">
      <div class="row">
        <div class="column col-sm-6">
        <spinner [visible]="isLoading"> </spinner>
          <ul class="list-group posts">
            <li *ngFor="let post of _posts; let i = index;" 
                [id]="post.id"
                (click)="selectPost2(i)"
                class="list-group-item"
                [class.active]="selectedPost?.id == post.id" >{{ post.title }}
            </li>
          </ul>
        </div> <!-- column>

        <!-- detail panel, visible only if something is selected -->
        <div *ngIf="selectedPost != null"
            class="column col-sm-6">
            <!-- bootstrap panel with header markup -->
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">{{ selectedPost?.title }}</h3>
              </div>
              <div class="panel-body">
                {{ selectedPost?.body }}
              </div>
            </div>
        </div>
      </div> <!-- row -->
    </div>
    ` ,

    styles: [ `
        .posts li { cursor: default; }
        .posts li:hover { background:	#ecf0f1; }	
        .list-group-item.active,	
        .list-group-item.active:hover,	
        .list-group-item.active:focus {	
	        background-color: #ecf0f1;
	        border-color: #ecf0f1;	
	        color: #2c3e50;
        }
    `]
})
export class PostsComponent implements OnInit, OnDestroy { 
    _posts: Post[];

    _url = "http://jsonplaceholder.typicode.com/posts";

    subscription;
    isLoading = true;

    selectedPost: Post;

    constructor(private _ajaxService: AjaxService) { }

    ngOnInit() {
        this.getPosts();
        this.selectedPost = null; 
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
    
    selectPost(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        this.selectedPost = this._posts[2];
    }

    selectPost2(index) {
        this.selectedPost = this._posts[index];
    }

}