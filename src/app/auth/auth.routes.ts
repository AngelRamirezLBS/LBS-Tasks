import { Routes } from '@angular/router';

const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth.page'),
        children: [
            { path: 'login', loadComponent: () => import('./pages/login/login.page') },
            { path: 'register', loadComponent: () => import('./pages/register/register.page') },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
        ],
    },
];

export default authRoutes;
