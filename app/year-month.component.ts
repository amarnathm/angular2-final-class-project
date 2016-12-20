import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
    template: `
    <h1>Year / Month </h1>
    {{ year }} / {{ month }}
    `
})
export class YearMonthComponent implements OnInit, OnDestroy { 
    year: number;
    month: number;
    subscription;

    constructor( private _route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this._route.params.subscribe(
            (params) => { 
                this.year = +params["year"];
                this.month = +params["month"];   
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}