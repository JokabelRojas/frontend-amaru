import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';
import { PanelAdmin } from './features/pages/panel-admin/panel-admin';

export const routes: Routes = [
    {
        path: '', component: Dashboard
    },
    {
        path: 'login', component: Login
    },
    {
        path: 'panel', component: PanelAdmin, canActivate: [AuthGuard]
    },

    {
        path: '**', redirectTo: '', pathMatch: 'full',
    }
];
