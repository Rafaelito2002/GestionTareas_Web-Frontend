import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../services/tarea.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { Tarea, TareaDTO } from '../models/tarea.model';
import { Asignatura } from '../models/asignatura.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tareas.component.html'
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
  asignaturas: Asignatura[] = [];
  currentTarea: TareaDTO = { nombre: '', descripcion: '', fechaEntrega: new Date(), asignaturaId: 0 };
  showForm = false;
  editingTarea = false;
  viewingTarea: Tarea | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';
  userType: string | null = null;

  constructor(
    private tareaService: TareaService,
    private asignaturaService: AsignaturaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.loadTareas();
    this.loadAsignaturas();
  }

  isEstudiante(): boolean {
    return this.userType === 'estudiante';
  }

  isDocente(): boolean {
    return this.userType === 'docente';
  }

  loadTareas() {
    this.loading = true;
    this.tareaService.getTareas().subscribe({
      next: (data) => {
        this.tareas = data;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Error al cargar tareas');
        this.loading = false;
      }
    });
  }

  loadAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe({
      next: (data) => {
        this.asignaturas = data;
      },
      error: (error) => {
        this.showError('Error al cargar asignaturas');
      }
    });
  }

  saveTarea() {
    if (!this.validateForm()) return;

    this.loading = true;

    if (this.editingTarea && this.currentTarea.id) {
      this.tareaService.updateTarea(this.currentTarea.id, this.currentTarea)
        .subscribe({
          next: () => {
            this.showSuccess('Tarea actualizada correctamente');
            this.loadTareas();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al actualizar tarea')
        });
    } else {
      this.tareaService.createTarea(this.currentTarea)
        .subscribe({
          next: () => {
            this.showSuccess('Tarea creada correctamente');
            this.loadTareas();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al crear tarea')
        });
    }
  }

  editTarea(tarea: Tarea) {
    this.currentTarea = {
      id: tarea.id,
      nombre: tarea.nombre,
      descripcion: tarea.descripcion || '',
      fechaEntrega: new Date(tarea.fechaEntrega),
      asignaturaId: tarea.asignaturaId
    };
    this.editingTarea = true;
    this.showForm = true;
    this.clearMessages();
  }

  viewTarea(tarea: Tarea) {
    this.viewingTarea = tarea;
  }

  deleteTarea(id: number) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.loading = true;
      this.tareaService.deleteTarea(id).subscribe({
        next: () => {
          this.showSuccess('Tarea eliminada correctamente');
          this.loadTareas();
        },
        error: (error) => this.showError('Error al eliminar tarea')
      });
    }
  }

  cancelEdit() {
    this.currentTarea = { nombre: '', descripcion: '', fechaEntrega: new Date(), asignaturaId: 0 };
    this.showForm = false;
    this.editingTarea = false;
    this.clearMessages();
  }

  validateForm(): boolean {
    if (!this.currentTarea.nombre?.trim()) {
      this.showError('El nombre es requerido');
      return false;
    }
    if (!this.currentTarea.asignaturaId) {
      this.showError('Debe seleccionar una asignatura');
      return false;
    }
    if (!this.currentTarea.fechaEntrega) {
      this.showError('La fecha de entrega es requerida');
      return false;
    }
    return true;
  }

  getAsignaturaNombre(asignaturaId: number): string {
    const asignatura = this.asignaturas.find(a => a.id === asignaturaId);
    return asignatura ? asignatura.nombre : 'N/A';
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

  getFechaActual(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  getFechaMinima(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
