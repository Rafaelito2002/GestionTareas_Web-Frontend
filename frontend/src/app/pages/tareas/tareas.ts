import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../services/tareas';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tareas.html'
})

export class Tareas {
  tareas: any[] = [];
  nuevaTarea = {nombre: '', descripcion: '', fecha_de_entrega:''};
  asignaturaId: number = 0;

  constructor(private tareasService:TareaService, private route: ActivatedRoute){}

  ngOnInit(){
    this.asignaturaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTareas();
  }

  cargarTareas(){
    this.tareasService.getTareasAsignatura(this.asignaturaId).subscribe((res:any)=>{
      this.tareas=res;
    })
  }

  crearTarea(){
    const data = {...this.nuevaTarea, asignaturaId:this.asignaturaId};
    this.tareasService.crearTarea(data).subscribe(()=>{
      this.nuevaTarea= {nombre:'',descripcion:'',fecha_de_entrega:''};
      this.cargarTareas();
    })
  }
}
