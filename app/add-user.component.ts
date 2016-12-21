import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { UserValidators } from './user-validators';
import { IHasChanges } from './has-changes.interface';

@Component({

    templateUrl: 'app/add-user.component.html'
   
})
export class AddUserComponent implements IHasChanges {

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

    hasChanges() {
        if (this.addUserForm.dirty)
            return true;
        else
            return false;
        
    }
    
}