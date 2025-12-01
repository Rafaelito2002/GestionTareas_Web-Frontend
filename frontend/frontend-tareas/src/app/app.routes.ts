import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './pages/guards/auth.guard';
import { EstudiantesComponent } from './pages/estudiante/estudiante.component';
import { DocentesComponent } from './pages/docente/docente.component';
import { EntregasComponent } from './pages/entregas/entregas.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { AsignaturasComponent } from './pages/asignaturas/asignaturas.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'estudiantes',
    component: EstudiantesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'docentes',
    component: DocentesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'entregas',
    component: EntregasComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'tareas',
    component: TareasComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'asignaturas',
    component: AsignaturasComponent,
    canActivate: [AuthGuard]
  },

];

export const appConfig = {
  providers: [
    { provide: HttpClientModule, useValue: null },
    FormsModule,
    ReactiveFormsModule,
  ]
};
