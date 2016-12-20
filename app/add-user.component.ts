import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserValidators } from './user-validators';

@Component({

    templateUrl: 'app/add-user.component.html'
   
})
export class AddUserComponent {

    addUserForm : FormGroup;
    
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

    constructor(fb: FormBuilder) {
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
}