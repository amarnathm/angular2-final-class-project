import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    template: `
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li>
                <a [class.disabled]="currentPage == 1" 
                    (click)="navigateTo(1)"
                    aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li *ngFor="let page of pages; let i = index;" >
                <a [class.active]="currentPage == (i+1)" (click)="navigateTo(i+1)"  >
               {{ i+1 }}
                </a>
            </li>
            <li>
                <a [class.disabled]="currentPage == totalPages"
                    (click)="navigateTo(totalPages)" 
                    aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
    `
})
export class PaginationComponent implements OnChanges {

    @Input() items: any[];
    @Input('page-size') pageSize;
    @Input('posts-change-count') _postsChangeCount;

    @Output('change') pageChangeEvent = new EventEmitter();

    totalPages: number;
    private static defaultPageSize = 10; 
    currentPage: number;

    private _prevPostsChangeCount = 0;

    pages;

    ngOnChanges() {

        // page size
        if (!this.pageSize || this.pageSize <= 0)
            this.pageSize = PaginationComponent.defaultPageSize;
        
        // total pages
        if (this.items) {

            // integer division
            this.totalPages = this.items.length / this.pageSize;
            // add 1 if there is a remainder
            if (this.items.length % this.pageSize > 0)
                this.totalPages += 1;
        }
        else
            this.totalPages = 0;  
        
        // reset current page if necessary
        var resetPage = false;
        if (this._postsChangeCount > this._prevPostsChangeCount) {
            resetPage = true;
            this._prevPostsChangeCount = this._postsChangeCount;
        }
        if (resetPage || !this.currentPage)
            this.currentPage = 1;
        
        this.pages = Array(this.totalPages).fill(1).map((x, i) => i);
        console.log(this.pages);
        console.log("(currentPage, totalPages, totalItems)= " + this.currentPage
            + "," + this.totalPages + ", " + this.items.length);

    }

    navigateTo(pageNum) {
        if (pageNum == this.currentPage || pageNum < 0 || pageNum > this.totalPages)
            return;
        else {
            this.currentPage = pageNum;
            this.pageChangeEvent.emit({
                value: pageNum
            });
        }


    }

}