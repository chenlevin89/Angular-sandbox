import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appMustInclude]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MustIncludeDirective, multi: true }]
})
export class MustIncludeDirective implements Validator {

    @Input() appMustInclude: string;

    validate(control: AbstractControl): ValidationErrors {
        return this.appMustInclude ? mustIncludeValidator(this.appMustInclude)(control) : null;
    }

}

export function mustIncludeValidator(str: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }
        const result = (<string>control.value).indexOf(str) === -1;
        return result ? { 'mustInclude': { value: `muset include ${str}` } } : null;
    };
}
