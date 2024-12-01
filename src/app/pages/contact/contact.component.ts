import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoNumbersDirective } from '../../directives/no-numbers.directive';
import { CustomValidators } from '../../validators/custom.validators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NoNumbersDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Modelo para Template-driven form
  contactModelTemplate = {
    name: '',
    email: '',
    message: ''
  };

  // Reactive form
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        CustomValidators.noNumbers
      ]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmitTemplate() {
    if (this.contactModelTemplate) {
      console.log('Template Form:', this.contactModelTemplate);
    }
  }

  onSubmitReactive() {
    if (this.contactForm.valid) {
      console.log('Reactive Form:', this.contactForm.value);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  // Esta función marca todos los controles de un FormGroup como "touched" (tocados)
  // Es útil para mostrar errores de validación cuando se intenta enviar un formulario inválido
  // Recorre recursivamente todos los controles, incluyendo FormGroups anidados
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
