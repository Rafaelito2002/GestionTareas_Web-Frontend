import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignaturas',
  imports: [CommonModule,FormsModule],
  templateUrl: './asignaturas.html',
})
export class Asignaturas {
  asignaturas: any[] = [];
  nuevaAsignatura = {nombre: '', descripcion: ''};
  docenteId: number = 0;

  constructor(){}

  ngOnInit(){
    const user = JSON.parse(localStorage.getItem('user')||'{}');
    this.docenteId = user.usuario_id;
    this.cargarAsignaturas();
  }

  cargarAsignaturas(){

  }

  crearAsignaturas(){
  }
}
