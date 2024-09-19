import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layout Imports
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

// Guard Imports
import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

// Component Imports
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { TalleresComponent } from './talleres/talleres.component';
import { NuevoparticipanteComponent } from './participantes/nuevoparticipante/nuevoparticipante.component';
import { NuevotallerComponent } from './talleres/nuevotaller/nuevotaller.component';
import { NuevainscripcionComponent } from './inscripciones/nuevainscripcion/nuevainscripcion.component';

const routes: Routes = [
  {
    path: '', // URL root
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then(c => c.DefaultComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'inscripciones',
        loadComponent: () => import('./inscripciones/inscripciones.component').then(m => m.InscripcionesComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevainscripcion',
        loadComponent: () => import('./inscripciones/nuevainscripcion/nuevainscripcion.component').then(m => m.NuevainscripcionComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'inscripciones/editar/:id',
        loadComponent: () => import('./inscripciones/nuevainscripcion/nuevainscripcion.component').then(m => m.NuevainscripcionComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'participantes',
        loadComponent: () => import('./participantes/participantes.component').then(m => m.ParticipantesComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoparticipante',
        loadComponent: () => import('./participantes/nuevoparticipante/nuevoparticipante.component').then(m => m.NuevoparticipanteComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'participantes/editar/:id',
        loadComponent: () => import('./participantes/nuevoparticipante/nuevoparticipante.component').then(m => m.NuevoparticipanteComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'talleres',
        loadComponent: () => import('./talleres/talleres.component').then(m => m.TalleresComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevotaller',
        loadComponent: () => import('./talleres/nuevotaller/nuevotaller.component').then(m => m.NuevotallerComponent),
        //canActivate: [usuariosGuardGuard]
      },
      {
        path: 'talleres/editar/:id',
        loadComponent: () => import('./talleres/nuevotaller/nuevotaller.component').then(m => m.NuevotallerComponent),
        //canActivate: [usuariosGuardGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'login/:id',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
