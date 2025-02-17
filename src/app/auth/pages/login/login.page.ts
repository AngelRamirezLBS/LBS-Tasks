import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton,  AlertController, ToastController } from '@ionic/angular/standalone';
import { FormsService } from 'src/app/shared/services/forms.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { ErrorMessageComponent } from "../../../shared/components/error-message/error-message.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormFieldComponent, IonButton, CommonModule, ReactiveFormsModule, ErrorMessageComponent]
})
export default class LoginPage{
  private fb              = inject(FormBuilder);
  private router          = inject(Router);
  private formsService    = inject(FormsService);
  private authService     = inject(AuthService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  public loginForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.pattern(this.formsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public formFields = signal([
    {controlName: 'email',     label: 'Correo Electrónico',   type: 'email'},
    {controlName: 'password',  label: 'Contraseña',           type: 'password'},
  ]);

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: async () => this.router.navigate(['/tasks']),
        error: async (error) => {
          const toast = await this.toastController.create({
            message: `${error}`,
            duration: 3000,
            position: 'top',
          });
      
          await toast.present();
        }
      });
  }

  isValidField(field: string){
    return this.formsService.isValidField(this.loginForm, field);
  }

  getFieldError(field: string){
    return this.formsService.getFieldError(this.loginForm, field);
  }

}
