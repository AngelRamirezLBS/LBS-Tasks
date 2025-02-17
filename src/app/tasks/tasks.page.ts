import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonFab, IonFabButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { ListComponent } from "./components/list/list.component";
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { CreateTask, TaskData, UpdateTask } from './interfaces/tasks.interface';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFabButton, IonFab, IonSearchbar, IonContent, IonHeader, IonToolbar, IonTitle, CommonModule, FormsModule, ListComponent]
})
export default class TasksPage {
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);
  private authService = inject(AuthService);
  private router = inject(Router);
  private tasksService = inject(TasksService);

  public taskList = signal<TaskData[]>([]);

  ngOnInit(): void {
    this.getTasksList();
  }

  async onNewTask() {
    try {
      const modal = await this.modalCtrl.create({
        component: NewTaskModalComponent,
      });
      await modal.present();
      const { role, data } = await modal.onWillDismiss();
      if (role === 'confirm') {
        this.tasksService.createTask(data as CreateTask).subscribe(
          (task) => this.taskList.update(tasks => tasks.concat(task))
        )
      }
    } catch (error) {
      console.error('Error al presentar el modal:', error);
    }
  }

  async editTask(taskData: TaskData) {
    try {
      const modal = await this.modalCtrl.create({
        component: NewTaskModalComponent,
        componentProps: {
          task: taskData
        }
      });
      await modal.present();
      const { role, data } = await modal.onWillDismiss();
      if (role !== 'confirm') 
        return;
      this.tasksService.updateTask(data as UpdateTask, taskData._id).subscribe(
        (task) => {
          const index = this.taskList().findIndex(t => t._id === task._id);
          if (index !== -1) 
            this.taskList()[index] = task;
        },
      );
    } catch (error) {
      console.error('Error al presentar el modal:', error);
    }
  }

  async deleteTask(task: TaskData) {
    try {
      const alert = await this.alertCtrl.create({
        header: 'Borrar',
        message: `Segur@ que desea borrar la tarea: ${task.title}?`,
        buttons: [{ text: 'Cancel', role: 'cancel' }, { text: 'Ok', role: 'confirm' }],
      });

      await alert.present();
      const { role } = await alert.onWillDismiss();
      if (role !== 'confirm')
        return;
      this.tasksService.deleteTask(task._id).subscribe(
        () => {
          const index = this.taskList().findIndex(t => t._id === task._id);
          if (index !== -1) {
            this.taskList().splice(index, 1);
          }
        },
      )
    } catch (error) {
      console.error('Error al presentar el modal:', error);
    }
  }

  getTasksList() {
    this.tasksService.getAllTask().subscribe(
      (tasks) => this.taskList.set(tasks)
    )
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
