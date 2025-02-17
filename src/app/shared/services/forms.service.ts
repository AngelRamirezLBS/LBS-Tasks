import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  public fullNamePattern: string = '^[A-ZÁÉÍÓÚÑa-záéíóúñ]+( [A-ZÁÉÍÓÚÑa-záéíóúñ]+)+$';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isValidField(form: FormGroup, field: string): boolean | null{
    return form.controls[field].errors
      && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control1 = formGroup.get(fieldOne);
      const control2 = formGroup.get(fieldTwo);

      if (!control1 || !control2) 
        return null;
      
      if (control2.errors && !control2.errors['notEqual']) 
        return null;
      
      if (control1.value !== control2.value) {
        control2.setErrors({ notEqual: true });
        return { notEqual: true };
      } else {
        control2.setErrors(null);
        return null;
      }
    };
  }

  getFieldError(form: FormGroup, field: string ): string | null {
    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
        
        case 'pattern':
          if(field === 'email')
            return 'Formato de correo no válido.';
          if(field === 'fullName')
            return 'Ingrese el nombre competo.'
          return 'Formato no válido';
        case 'notEqual':
          return 'Las contraseñas no coinciden.'
      }
    }

    return null;
  }

}
