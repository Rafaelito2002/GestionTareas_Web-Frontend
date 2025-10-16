import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntregaService } from '../../services/entregas';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.html',
})
export class Entregas {
  entregas: any[]=[];
  archivo: File | null= null;
  tareaId: number = 0;
  estudianteId:number = 0;
  user:any;

  constructor(private entregasService: EntregaService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.estudianteId = this.user.usuario_id;
    this.cargarEntregas();
  }

  cargarEntregas(){
    this.entregasService.getEntregasPorTarea(this.tareaId).subscribe((res: any) => {
      this.entregas = res;
    });
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  subirEntrega() {
    if (!this.archivo) return;
    const formData = new FormData();
    formData.append('archivo', this.archivo);
    formData.append('tarea_id', this.tareaId.toString());
    formData.append('estudiante_id', this.estudianteId.toString());
    formData.append('fecha_entrega', new Date().toISOString().split('T')[0]);

    this.entregasService.subirEntrega(formData).subscribe(() => {
      this.archivo = null;
      this.cargarEntregas();
    });
  }

  calificar(entregaId: number, nota: number) {
    this.entregasService.calificarEntrega(entregaId, nota).subscribe(() => {
      this.cargarEntregas();
    });
  }

}
