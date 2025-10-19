import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.asignaturaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTareas();
  }

  cargarTareas(){

  }

  crearTarea(){

  }
}
