import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, } from '@ionic/angular/standalone';
import { Component, inject, input, output, signal } from '@angular/core';
import { CardTaskComponent } from "../card-task/card-task.component";
import { TaskData } from '../../interfaces/tasks.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'tasks-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, CardTaskComponent]
})
export class ListComponent {
  
  public taskList = input.required<TaskData[]>();

  public editTask = output<TaskData>();
  public deleteTask = output<TaskData>();

  onEditTask(task: TaskData){
    this.editTask.emit(task);
  }

  onDeleteTask(task: TaskData){
    this.deleteTask.emit(task);
  }
}
