import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanDeactivate, ActivatedRoute } from '@angular/router';
import { UserValidators } from './user-validators';
import { IHasChanges } from '../shared/has-changes.interface';
import { AjaxService } from '../shared/ajax.service';


@Component({

    templateUrl: 'app/users/add-user.component.html'
   
})
export class AddUserComponent implements IHasChanges, OnInit {

    _title = "Add user";
    addUserForm: FormGroup;

    // user object initialized to blank
    _user;
   
    subscription; 

    // same value of url being repeated. TODO make it a constant 
    private _url = 'http://jsonplaceholder.typicode.com/users';
    
    /*
        User
            Name
            Email
            Phone
        Address
            Street
            Suite
            City
            Zipcode
    */

    constructor(fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _ajaxService: AjaxService)
    {
        this.addUserForm = fb.group({
                id: [ ''] ,  
                name: ['', Validators.compose([ Validators.required ])],
                email: ['', Validators.compose([ Validators.required, UserValidators.isInvalidEmail, ])],
                phone: [''],
                
            address: fb.group({
                street: [''],
                suite: [''],
                city: [''],
                zipcode: [''],
            })
        });

        this.clearUser();

    }

    ngOnInit() {
        this.subscription = this._route.params.subscribe(
            params => {
                this._user.id = +params["id"];

                if (this._user.id) {
                    var url = this._url + "/" + this._user.id;
                    this._ajaxService.get(url)
                        .subscribe(response => {
                            console.log(response);
                            this._user = response;
                        },
                        error => {
                            console.log(error);
                            this._router.navigate(['notfound']);
                        }
                        , () => {
                            // complete   

                        });
                    
                    this._title = "Edit User";
                }
                else
                    this.clearUser();    
                
                console.log(this.addUserForm.value);
            }
        );
        
    }

    clearUser() {

        // init user to a blank user
        this._user = {
            id: '',
            name: '',
            email: '',
            phone: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            }
        }

        this._title = "Add User";
    }

    hasChanges() {
        if (this.addUserForm.dirty)
            return true;
        else
            return false;
        
    }

    createOrEditUser() {
        if (this.addUserForm.value.id) {
            console.log("id =" + this.addUserForm.value.id);
            this.editUser();
        }
        else {
            console.log("id is empty");
            this.createUser();  
        }

        return false;
            
    }

    createUser() {
        this._ajaxService.post(this._url, this.addUserForm.value)
            .subscribe(response => {
                console.log(response);
                this._router.navigate(['/users']);
            },
            error => {
                console.log("error!");
                console.log(error);
            }
            , () => {
                // complete   

            })
    }

    editUser() {
        var url = this._url + "/" + this._user.id;
        this._ajaxService.put(url, this.addUserForm.value)
            .subscribe(response => {
                console.log(response);
                this._router.navigate(['/users']);
            },
            error => {
                console.log("error!");
                console.log(error);
            }
            , () => {
                // complete   

            });
    }
    
}