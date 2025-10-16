import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { asignaturaService } from '../../services/asignaturas';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  user: any = null;
  asignaturas: any[] = [];

  constructor(private asignaturasService: asignaturaService) {}

  ngOnInit(){
    const data = localStorage.getItem('user');
    if(data) this.user = JSON.parse(data);
    if (this.user.tipo_usuario === 'docente'){
        this.asignaturasService.getAsignatura(this.user.usuario_id).subscribe((res:any)=>{
          this.asignaturas = res;

        })
    }
  }
}
