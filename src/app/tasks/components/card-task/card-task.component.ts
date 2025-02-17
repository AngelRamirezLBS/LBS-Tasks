import { Component, HostListener, OnInit, computed, input, output, signal } from '@angular/core';
import { IonCard, IonItem, IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonChip, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { TaskData } from '../../interfaces/tasks.interface';
import { CommonModule } from '@angular/common';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';



@Component({
  selector: 'card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss'],
  imports: [CommonModule ,IonCard,  IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonChip, IonCardContent, IonButton, TaskStatusPipe]
})
export class CardTaskComponent  implements OnInit {
  
  private screenWidth = signal<number>(0);
  
  public task = input.required<TaskData>();

  public edit = output<TaskData>();
  public delete = output<TaskData>();


  public isMobile = computed( () => this.screenWidth() < 720);

  constructor() {
    this.updateScreenSize();
  }

  ngOnInit() {}

  getStatusColor(taskStatus: string): string {
    switch (taskStatus) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'primary';
      default:
        return 'primary';
    }
  }

  editTask() {
    this.edit.emit(this.task());
  }

  deleteTask() {
    this.delete.emit(this.task())
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScreenSize();
  }

  private updateScreenSize() {
    this.screenWidth.set(window.innerWidth);
  }



}
