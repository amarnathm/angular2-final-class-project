import { Component, OnInit, OnChanges } from '@angular/core';
import { Post } from './post';
import { PostDetailComponent } from './post-detail.component';
import { PaginationComponent } from '../shared/pagination.component';

import { AjaxService } from '../shared/ajax.service';
import { User } from '../users/user.interface';

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
        <!-- pagination -->
        <pagination 
            *ngIf="numPages > 1"
             [items]="_posts" 
             [posts-change-count]="_postsChangeCount"
             [page-size]="pageSize"
             (change)="onPageChange($event)" ></pagination>
          <ul class="list-group posts">
            <li *ngFor="let post of _currentPagePosts; let i = index;" 
                id="{{ post.id }} "
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
    pageSize: number = 10;
    numPages: number;
    // increment this when posts change because of updatePosts
    _postsChangeCount = 1;
    private _currentPagePosts: Post[];
    private _currentPageNum;

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
                this._postsChangeCount += 1;
                this.computeNumPages();
                this.selectedPost = null;
                // reset start page to 1
                this.computeCurrentPagePosts(1);
                console.log(this._posts);
            }
        ), error => console.log(error)
        , () => { }; // completed 
        
        
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
    

    selectPost2(index) {
        this.selectedPost = this._currentPagePosts[index];
    }

    private computeNumPages() {
        if (this._posts)
            this.numPages = this._posts.length / this.pageSize + this._posts.length % this.pageSize;
        else
            this.numPages = 1;    
    }

    onPageChange(event) {
        var currentPage = event.value;
        this.computeCurrentPagePosts(currentPage);
    }

    private computeCurrentPagePosts(currentPage) {
        // if posts is empty
        if (!this._posts) {
            this._currentPagePosts = this._posts;
            return;
        }

        // if pageSize is 10, currentPage is 1, start = 0;
        var start = (currentPage - 1) * this.pageSize;

        var end = start + this.pageSize;
        if (this._posts && end >= this._posts.length)
            end = this._posts.length;
        
        // copy the items from _posts from start to end, inclusive
        var tmp: Post[] = [];
        for (var i = start; i < end; i++) {
            tmp.push(this._posts[i]);
        }
        this._currentPageNum = currentPage;
        this._currentPagePosts = tmp;
    }

}