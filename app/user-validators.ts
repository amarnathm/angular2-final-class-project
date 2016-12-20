import { FormControl, FormGroup } from '@angular/forms';

export class UserValidators {

    // https://www.mkyong.com/regular-expressions/how-to-validate-email-address-with-regular-expression/    
    static  EMAIL_REG_EX = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";  
    
    static isInvalidEmail(control: FormControl) {
        // if no value, let required-check handle it, i.e., return null
        if (!control || !control.value)
            return null;
        
        // control.value is not null. it could still be a whitespace.
        if (control.value.match(UserValidators.EMAIL_REG_EX))
            return null;
        else
            return { isInvalidEmail: true };
        
    }
}