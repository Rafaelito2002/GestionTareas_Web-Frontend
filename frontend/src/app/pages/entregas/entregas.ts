import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entregas',
  imports: [CommonModule],
  templateUrl: './entregas.html',
})
export class Entregas {
  entregas: any[]=[];
  archivo: File | null= null;
  tareaId: number = 0;
  estudianteId:number = 0;
  user:any;

  constructor( private route: ActivatedRoute) {}

  ngOnInit(){
    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.estudianteId = this.user.usuario_id;
    this.cargarEntregas();
  }

  cargarEntregas(){

  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  subirEntrega() {

  }

  calificar(entregaId: number, nota: string) {

  }

}
