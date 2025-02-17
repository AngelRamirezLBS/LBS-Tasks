import { Component, inject, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { IonNote } from '@ionic/angular/standalone';


@Component({
  selector: 'shared-error-message',
  imports: [IonNote],
  template: `
    @if(isValidField() && form().touched){
      <ion-note color="danger">
        <p>{{ getFieldError() }}</p>
      </ion-note>
    }
  `
})
export class ErrorMessageComponent {
  private formsService = inject(FormsService);

  public form = input.required<FormGroup>();
  public controlName = input.required<string>();
 
  isValidField(){
    return this.formsService.isValidField(this.form(), this.controlName() );
  }

  getFieldError(){
    return this.formsService.getFieldError(this.form(), this.controlName() );
  }
}
