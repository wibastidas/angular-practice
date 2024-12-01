import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoNumbers]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NoNumbersDirective,
    multi: true
  }]
})
export class NoNumbersDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const hasNumbers = /\d/.test(control.value);
    return hasNumbers ? { containsNumbers: true } : null;
  }
}
