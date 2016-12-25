import { Component, Input, OnInit } from '@angular/core';
import { Post } from './post';

@Component({
    selector: 'post-detail',
    template: `
      <div *ngIf="post != null" class="column col-sm-6">
        <!-- bootstrap panel with header markup -->
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{{ post.title }}</h3>
          </div>
          <div class="panel-body">
            {{ post.body }}

            <comments [_post]="post"> </comments>
          </div>
          
        </div>
    </div>
    `
})
export class PostDetailComponent implements OnInit{

    @Input() post: Post;

    ngOnInit() {
        console.log("PostDetailComponent: post=");
        console.log(this.post);
    }

}