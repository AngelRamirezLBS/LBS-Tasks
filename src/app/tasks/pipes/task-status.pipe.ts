import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus',
  standalone: true
})
export class TaskStatusPipe implements PipeTransform {

  transform(taskStatus: string): string {
    switch (taskStatus) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En progreso';
    }
    return taskStatus;
  }

}
