import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonItem, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, ModalController, IonDatetime, IonLabel } from '@ionic/angular/standalone';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { TaskData } from '../../interfaces/tasks.interface';



@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, FormFieldComponent, ErrorMessageComponent, IonDatetime, IonLabel, IonItem, IonSelect, IonSelectOption, ReactiveFormsModule]
})
export class NewTaskModalComponent {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);

  public task = input<TaskData>();

  public taskForm!: FormGroup;

  public formFields = signal([
    { controlName: 'title', label: 'Titulo', type: 'text' },
    { controlName: 'description', label: 'Descripción', type: 'text-area' },
  ]);

  public minDate = signal('');

  ngOnInit() {
    const today = new Date();
    this.minDate.set(today.toISOString().split('T')[0]);
    this.taskForm = this.fb.group({
      title: [this.task()?.title || '', [Validators.required]],
      description: [this.task()?.description || '', [Validators.required]],
      dueDate: [this.task()?.dueDate || new Date().toISOString(), [Validators.required]],
      status: [this.task()?.status || 'pending'],
    });
  }

  get title(): string{
    return this.task() ? 'Editar' : 'Agregar';
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.taskForm.value, 'confirm');
  }
}
