import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '', component: Login
    },
    {
        path: 'dashboard', component: Dashboard
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full',
    }
];
