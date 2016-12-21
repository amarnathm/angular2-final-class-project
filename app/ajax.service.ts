import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AjaxService {

    constructor( private _http : Http) {}

    // returns an Observable<json object>    
    get(url: string) : Observable<Object> {
        return this._http.get(url).map(response => response.json());
    }

    post(url: string, data: any): Observable<Object> {
        return this._http.post(url, JSON.stringify(data))
            .map(response =>  response.json() );
    }

}