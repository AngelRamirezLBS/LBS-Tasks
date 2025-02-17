import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonInputPasswordToggle, IonItem, IonInput, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'shared-form-field',
  styleUrls: ['./form-field.component.scss'],
  imports: [IonItem, IonInput, ReactiveFormsModule, IonInputPasswordToggle, IonTextarea],
  template: `
    <ion-item [formGroup]="form()">
      @if( type() === 'text-area'){
        <ion-textarea
          [autoGrow]="true"
          fill="outline"
          [formControlName]="controlName()"
          [label]="label()"
          labelPlacement="stacked"
        ></ion-textarea>
      }@else {
        <ion-input
          fill="outline"
          [formControlName]="controlName()"
          [label]="label()"
          labelPlacement="stacked"
          [type]="type()">
          @if(type() === 'password'){
            <ion-input-password-toggle slot="end"/>
          }
        </ion-input>
      }
    </ion-item>
  `
})
export class FormFieldComponent {
  controlName = input.required<string | number | null>();
  label = input.required<string>();
  form = input.required<FormGroup>();
  type = input<string>('text');
}
