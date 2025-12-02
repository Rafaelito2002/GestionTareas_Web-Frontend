import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntregaService } from '../../services/entrega.service';
import { TareaService } from '../../services/tarea.service';
import { EstudianteService } from '../../services/estudiante.service';
import { Entrega, EntregaDTO } from '../models/entrega.model';
import { Tarea } from '../models/tarea.model';
import { Estudiante } from '../models/estudiante.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './entregas.component.html'
})
export class EntregasComponent implements OnInit {
  entregas: Entrega[] = [];
  tareas: Tarea[] = [];
  estudiantes: Estudiante[] = [];
  currentEntrega: EntregaDTO = {
    estudianteId: 0,
    tareaId: 0,
    fechaEntrega: new Date(),
    archivo: '',
    calificacion: 0
  };
  showForm = false;
  editingEntrega = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private entregaService: EntregaService,
    private tareaService: TareaService,
    private estudianteService: EstudianteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEntregas();
    this.loadTareas();
    this.loadEstudiantes();
  }

  loadEntregas() {
    this.loading = true;
    this.entregaService.getEntregas().subscribe({
      next: (data) => {
        this.entregas = data;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Error al cargar entregas');
        this.loading = false;
      }
    });
  }

  loadTareas() {
    this.tareaService.getTareas().subscribe({
      next: (data) => {
        this.tareas = data;
      },
      error: (error) => {
        this.showError('Error al cargar tareas');
      }
    });
  }

  loadEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (error) => {
        this.showError('Error al cargar estudiantes');
      }
    });
  }

  saveEntrega() {
    if (!this.validateForm()) return;

    this.loading = true;

    if (this.editingEntrega && this.currentEntrega.id) {
      this.entregaService.updateEntrega(this.currentEntrega.id, this.currentEntrega)
        .subscribe({
          next: () => {
            this.showSuccess('Entrega actualizada correctamente');
            this.loadEntregas();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al actualizar entrega')
        });
    } else {
      this.entregaService.createEntrega(this.currentEntrega)
        .subscribe({
          next: () => {
            this.showSuccess('Entrega creada correctamente');
            this.loadEntregas();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al crear entrega')
        });
    }
  }

  editEntrega(entrega: Entrega) {
    this.currentEntrega = {
      id: entrega.id,
      estudianteId: entrega.estudianteId,
      tareaId: entrega.tareaId,
      fechaEntrega: new Date(entrega.fechaEntrega),
      archivo: entrega.archivo || '',
      calificacion: entrega.calificacion || 0
    };
    this.editingEntrega = true;
    this.showForm = true;
    this.clearMessages();
  }

  deleteEntrega(id: number) {
    if (confirm('¿Estás seguro de eliminar esta entrega?')) {
      this.loading = true;
      this.entregaService.deleteEntrega(id).subscribe({
        next: () => {
          this.showSuccess('Entrega eliminada correctamente');
          this.loadEntregas();
        },
        error: (error) => this.showError('Error al eliminar entrega')
      });
    }
  }

  cancelEdit() {
    this.currentEntrega = {
      estudianteId: 0,
      tareaId: 0,
      fechaEntrega: new Date(),
      archivo: '',
      calificacion: 0
    };
    this.showForm = false;
    this.editingEntrega = false;
    this.clearMessages();
  }

  validateForm(): boolean {
    if (!this.currentEntrega.estudianteId) {
      this.showError('Debe seleccionar un estudiante');
      return false;
    }
    if (!this.currentEntrega.tareaId) {
      this.showError('Debe seleccionar una tarea');
      return false;
    }
    if (!this.currentEntrega.fechaEntrega) {
      this.showError('La fecha de entrega es requerida');
      return false;
    }
    if (this.currentEntrega.calificacion !== undefined && this.currentEntrega.calificacion !== null) {
      if (this.currentEntrega.calificacion < 0 || this.currentEntrega.calificacion > 10) {
        this.showError('La calificación debe estar entre 0 y 10');
        return false;
      }
    }
    return true;
  }

  getEstudianteNombre(estudianteId: number): string {
    const estudiante = this.estudiantes.find(e => e.id === estudianteId);
    return estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : 'N/A';
  }

  getTareaNombre(tareaId: number): string {
    const tarea = this.tareas.find(t => t.id === tareaId);
    return tarea ? tarea.nombre : 'N/A';
  }

  showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    this.loading = false;
  }

  showSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    this.loading = false;
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  getColorByCalificacion(calificacion: number): string {
    if (calificacion >= 9) return 'bg-green-100 text-green-800';
    if (calificacion >= 7) return 'bg-yellow-100 text-yellow-800';
    if (calificacion >= 5) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  }

  getFechaActual(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
