import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanDeactivate } from '@angular/router';
import { UserValidators } from './user-validators';
import { IHasChanges } from './has-changes.interface';
import { AjaxService } from './ajax.service';


@Component({

    templateUrl: 'app/add-user.component.html'
   
})
export class AddUserComponent implements IHasChanges {

    addUserForm: FormGroup;

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
        private _ajaxService: AjaxService)
    {
        this.addUserForm = fb.group({
            user: fb.group({
                name: ['', Validators.compose([ Validators.required ])],
                email: ['', Validators.compose([ Validators.required, UserValidators.isInvalidEmail, ])],
                phone: ['']
                
            }),
            address: fb.group({
                street: [''],
                suite: [''],
                city: [''],
                zipcode: [''],
            })
        });

    }

    hasChanges() {
        if (this.addUserForm.dirty)
            return true;
        else
            return false;
        
    }

    createUser() {
        this._ajaxService.post(this._url, this.addUserForm.value)
            .subscribe(response => {
                console.log(response);
                this._router.navigate(['/users']);
            },
            error => console.log(error)
            , () => {
                // complete   

            }   

    }
    
}