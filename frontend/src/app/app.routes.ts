import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Asignaturas } from './pages/asignaturas/asignaturas';
import { Tareas } from './pages/tareas/tareas';
import { Entregas } from './pages/entregas/entregas';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: '', component:Home},
    {path: 'dashboard',component:Dashboard},
    {path: 'asignaturas', component:Asignaturas},
    {path: 'tareas',component:Tareas},
    {path: 'entregas',component:Entregas}
];

@NgModule({
    imports:[HttpClientModule,RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}
