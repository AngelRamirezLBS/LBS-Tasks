import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton,  AlertController, ToastController } from '@ionic/angular/standalone';
import { FormsService } from 'src/app/shared/services/forms.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [FormFieldComponent, ErrorMessageComponent, IonButton, CommonModule, ReactiveFormsModule]
})
export default class RegisterPage{

  private fb              = inject(FormBuilder);
  private router          = inject(Router);
  private formsService    = inject(FormsService);
  private authService     = inject(AuthService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  public registerForm: FormGroup = this.fb.group({
    fullName:  ['', [Validators.required, Validators.pattern(this.formsService.fullNamePattern)]],
    email:     ['', [Validators.required, Validators.pattern(this.formsService.emailPattern)]],
    password:  ['', [Validators.required, Validators.minLength(6)]],
    password2: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [this.formsService.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  public formFields = signal([
    {controlName: 'fullName',  label: 'Nombre completo',      type: 'text'},
    {controlName: 'email',     label: 'Correo Electrónico',   type: 'email'},
    {controlName: 'password',  label: 'Contraseña',           type: 'password'},
    {controlName: 'password2', label: 'Confirmar contraseña', type: 'password'},
  ]);

  ngOnInit(): void {
    this.listenPasswordChanges();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { fullName, email, password } = this.registerForm.value;
    this.authService.register({ fullName, email, password })
      .subscribe({
        next: async () => {
          const alert = await this.alertController.create({
            header: 'Bienvenido!',
            message: 'Te haz registrado correctamente.',
            buttons: ['Continuar'],
          });
          await alert.present();
          await alert.onDidDismiss();
          this.router.navigate(['/task']);
        },
        error: async (error) => {
          const toast = await this.toastController.create({
            message: `${error}`,
            duration: 1500,
            position: 'top',
          });
      
          await toast.present();
        }
      });
  }

  listenPasswordChanges() {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      const passwordControl = this.registerForm.get('password');
      const confirmPasswordControl = this.registerForm.get('password2');

      if (passwordControl!.valid) {
        confirmPasswordControl!.enable();
      } else {
        confirmPasswordControl!.disable();
        confirmPasswordControl!.reset();
      }
    });
  }

}
