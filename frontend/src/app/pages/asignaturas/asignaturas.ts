import { Component } from '@angular/core';
import { asignaturaService } from '../../services/asignaturas';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.html',
})
export class Asignaturas {
  asignaturas: any[] = [];
  nuevaAsignatura = {nombre: '', descripcion: ''};
  docenteId: number = 0;

  constructor(private asignaturaService: asignaturaService){}

  ngOnInit(){
    const user = JSON.parse(localStorage.getItem('user')||'{}');
    this.docenteId = user.usuario_id;
    this.cargarAsignaturas();
  }

  cargarAsignaturas(){
    this.asignaturaService.getAsignatura(this.docenteId).subscribe((res:any)=>{
      this.asignaturas = res;
    });
  }

  crearAsignaturas(){
    const data = {...this.nuevaAsignatura, docenteId:this.docenteId};
    this.asignaturaService.crearAsignatura(data).subscribe(()=>{
      this.nuevaAsignatura = {nombre:'',descripcion: ''};
      this.cargarAsignaturas();
    })
  }
}
