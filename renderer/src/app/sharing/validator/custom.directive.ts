import { Directive } from '@angular/core';
import {
    Input
} from '@angular/core';
import {
    Validator,
    AbstractControl,
    NG_VALIDATORS
} from '@angular/forms';

@Directive({
    selector: '[appCustomValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomValidatorDirective,
        multi: true
    }]
})
export class CustomValidatorDirective implements Validator {
    @Input('appCustomValidator') f: Function;

    validate(control: AbstractControl): {[key: string]: any} | null {
        const errObj = { appCustomValidator: 'fails'};
        try {
            return this.f(control.value) ? null : errObj;
        } catch (e) {
            return errObj;
        }
    }
}
