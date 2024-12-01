import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static noNumbers(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const hasNumbers = /\d/.test(control.value);
    return hasNumbers ? { noNumbers: true } : null;
  }
}
