import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Asignaturas } from './pages/asignaturas/asignaturas';
import { Tareas } from './pages/tareas/tareas';
import { Entregas } from './pages/entregas/entregas';

export const routes: Routes = [
    {path: '', component:Login},
    {path: 'dashboard',component:Dashboard},
    {path: 'asignaturas', component:Asignaturas},
    {path: 'tareas',component:Tareas},
    {path: 'entregas',component:Entregas}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}
