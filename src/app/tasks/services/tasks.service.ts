import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { CreateTask, TaskData, UpdateTask } from '../interfaces/tasks.interface';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly tasksURL: string = `${environment.baseURL}/tasks`;

  private http = inject(HttpClient);

  public getAllTask(): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(this.tasksURL);
  }

  public createTask(body: CreateTask): Observable<TaskData> {
    return this.http.post<TaskData>(this.tasksURL, body);
  }
  
  public updateTask(body: UpdateTask, id: string): Observable<TaskData> {
    return this.http.put<TaskData>(`${this.tasksURL}/${id}`, body);
  }

  public deleteTask( id: string): Observable<TaskData> {
    return this.http.delete<TaskData>(`${this.tasksURL}/${id}`);
  }
}
