import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';
import { PanelAdmin } from './features/pages/panel-admin/panel-admin';
import { PanelAdministracion } from './features/admin/panel-administracion/panel-administracion';
import { Categoria } from './features/admin/categoria/categoria';
import { Talleres } from './features/admin/talleres/talleres';
import { Festivales } from './features/admin/festivales/festivales';
import { Servicios } from './features/admin/servicios/servicios';
import { Inscripciones } from './features/admin/inscripciones/inscripciones';

export const routes: Routes = [
    {
        path: '', component: Dashboard
    },
    {
        path: 'login', component: Login
    },
    {
        path: 'panel', component: PanelAdmin, canActivate: [AuthGuard],
        children: [
            {
                path: 'panel-administracion',component: PanelAdministracion
            },
            {
                path: 'categoria', component:Categoria
            },
            {
                path: 'talleres', component: Talleres
            },
            {
                path: 'festivales', component: Festivales
            },
            {
                path: 'servicios', component: Servicios
            },
            {
                path: 'inscripciones', component: Inscripciones
            }
        ]
    },

    {
        path: '**', redirectTo: '', pathMatch: 'full',
    }
];
