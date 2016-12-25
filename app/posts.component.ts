import { Component, OnInit, OnChanges } from '@angular/core';
import { Post } from './post';
import { PostDetailComponent } from './post-detail.component';

import { AjaxService } from './ajax.service';
import { User } from './user.interface';

@Component({
    template: ` <h1> Posts </h1>
        
    
    <div class="container-fluid">
      <div class="row">
        <div class="column col-sm-6">
        <spinner [visible]="postsLoading || usersLoading"> </spinner>
        <select #u (change)="updatePosts(u.value)" >
            <option value="">Select a user ...</option>
            <option *ngFor="let user of _users; let ui = index;" [value]="user.id" >
                {{ user.name }}
            </option>
        </select>
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
        <post-detail [post]="selectedPost"> </post-detail>

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
export class PostsComponent implements OnInit { 
    private _posts: Post[];
    private _users: User[];

    private _postsUrl = "http://jsonplaceholder.typicode.com/posts";
    private _usersUrl = "http://jsonplaceholder.typicode.com/users";

   
    postsLoading = true;
    usersLoading = true;

    selectedPost: Post;
    selectedUserId: number;

    constructor(private _ajaxService: AjaxService) { }

    ngOnInit() {
        this.getUsers();
        this.getPosts();
    }

    updatePosts(userId: number) {
        console.log("userId=" + userId);
        this.selectedUserId = userId;
        this.getPosts();
    }

    getPosts() {
        this.postsLoading = true;

        // posts for a specific userId:
        // http://jsonplaceholder.typicode.com/posts?userId=1
        var url = this.selectedUserId ?
            this._postsUrl + "?userId=" + this.selectedUserId
            : this._postsUrl;
        this._ajaxService.get(url).subscribe(
            response => {
                this.postsLoading = false;
                this._posts = <Post[]>response;
            }
        ), error => console.log(error)
        , () => { }; // completed 
        
        this.selectedPost = null;
    }

    getUsers() {
        this.usersLoading = true;
        
        this._ajaxService.get(this._usersUrl).subscribe(
            response => {
                this.usersLoading = false;
                this._users = <User[]>response;         
            }    
        )
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