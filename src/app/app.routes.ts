import { Routes } from '@angular/router';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadComponent: () => import('./tasks/tasks.page')
  },
];
