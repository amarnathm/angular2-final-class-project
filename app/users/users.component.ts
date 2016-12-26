import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { AjaxService } from '../shared/ajax.service';
import { User } from './user.interface';



@Component({
    template: ` <h1>Users</h1>
        <p>
            <a class=" btn btn-primary" routerLink="/adduser">Add User</a>
        </p>
        <table class="table table-bordered">
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tr *ngFor="let user of _users">
                <td>{{ user.name }} </td>
                <td>{{ user.email }} </td>
                <td><a [routerLink]="['/edituser/' , user.id]"><i class="glyphicon glyphicon-edit"> </i></a></td>
                <td>
                    <i (click)="deleteUser(user)"
                        class="glyphicon glyphicon-remove"> 
                    </i>
                </td>
            </tr>
        </table>

        {{ _users | json }}
        
    `
})
export class UsersComponent implements OnInit, OnDestroy { 

    private loading = true;    
    private _url = 'http://jsonplaceholder.typicode.com/users'; 
    subscription;

    private _users : User[];

    constructor(private _ajaxService: AjaxService) { }
    
    ngOnInit() {
      
        this.subscription = this._ajaxService.get(this._url).subscribe(
            // replace the large users object with a small users object and return the array of small-users.
            largeUsers => {
                console.log(largeUsers);
                this.loading = false;

                /* this doesn't work. need to debug this
                var users = <User[]> [];
                for (var key in largeUsers) {
                    var user = <User>  {
                        username : key['username'],
                        email : key['email'],
                    }

                   
                    users.push(user);
                }
                this._users = users;
                */
               
                // truth is, the data has more fields than in the interface User.
                this._users = <User[]>largeUsers;
            }
        );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    deleteUser(user: User) {
        if (window.confirm("are you sure you want to delete " + user.name + "?")) {
            // delete the user
            this.deleteUserOptimistically (user);
        }
    }

    indexOf(user) {
        var searchTerm = user.id;
        var index = -1;
        for (var i = 0; i < this._users.length; i++) {
            if (this._users[i].id == searchTerm) {
                index = i;
                break;
            }
        }

        return index;
    }

    deleteUserOptimistically(user) {
        var index = this.indexOf(user);
        if (index > 0) {
            // delete the item at position == index
            this._users.splice(index, 1);  // angular should remove the row
            // now tell the server
            var url = this._url + "/" + user.id;
            // test delete a bogus user. this should fail -- works
            // url = this._url + "/" + 1001;
            this._ajaxService.delete(url).subscribe(
                response => {
                    console.log("delete success");
                    console.log(user);
                },
                error => {
                    console.log("delete failed at the server");
                    console.log(user);
                    // restore the user at position index
                    // this will add user after deleting 0 items first
                    
                    // put a delay so you can see it -- works
                    /*
                     setTimeout(() => {
                        this._users.splice(index, 0, user);
                    }, 2000);
                    */
                    this._users.splice(index, 0, user);
                },
                () => {
                    // completed
                }
            )
        }
    }

}