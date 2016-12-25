import { Component, Input, OnChanges } from '@angular/core';
import { Post, Comment } from './post';
import { AjaxService } from './ajax.service';
import { SpinnerComponent } from './spinner.component';

@Component({
    selector: 'comments' ,
    template: `
    <!-- bootstrap media list -->
    <spinner [visible]="isLoading"> </spinner>
    <div *ngIf="_comments != null" >
        <ul  class="media-list">
            <li *ngFor="let comment of _comments;"
                class="media">
                <div class="media-left">
                <a href="#">
                    <img class="media-object image" [src]="_imageUrlBase + comment.id" [alt]="comment.id">
                </a>
                </div>
                <div class="media-body">
                <h4 class="media-heading">{{ comment.name }}</h4>
                {{ comment.body }}
                </div>
            </li>
        </ul>
    </div>
    `
    , styles: [`
        .media-object.image { border-radius : 100%; }
    `]
    
})
export class CommentsComponent implements OnChanges {

    @Input() _post: Post;
    _comments: Comment[];
    isLoading = true;

    // e.g., http://jsonplaceholder.typicode.com/posts/1/comments    
    _commentsUrlBase = 'http://jsonplaceholder.typicode.com/posts/';

    // e.g., http://lorempixel.com/80/80/people?random=1    
    _imageUrlBase = 'http://lorempixel.com/80/80/people?random=';

    constructor(private _ajaxService: AjaxService) { }

    ngOnChanges() {
        this.reinitComments();
    }
    
    reinitComments() {
        // initialize _comments
        if (!this._post) {
            return;
        }

        // http://jsonplaceholder.typicode.com/posts/1/comments 
        var url = this._commentsUrlBase + this._post.id + "/comments";
        this._ajaxService.get(url).subscribe(
            response => {
                this.isLoading = false;
                this._comments = <Comment[]>response;
                console.log(this._comments);
            }
         ) , error => console.log(error)
            , () => { } // completion
        ;
        
    }

}