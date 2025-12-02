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
  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';
  showToast = false;
  showConfirmDelete = false;
  tareaToDeleteId: number | null = null;

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

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }

  loadTareas() {
    this.loading = true;
    this.tareaService.getTareas().subscribe({
      next: (data) => {
        this.tareas = data;
        this.loading = false;
      },
      error: (error) => {
        this.showToastMessage('❌ Error al cargar tareas', 'error');
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
        this.showToastMessage('❌ Error al cargar asignaturas', 'error');
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
            this.showToastMessage('✅ Tarea actualizada correctamente', 'success');
            this.loadTareas();
            this.cancelEdit();
          },
          error: () => this.showToastMessage('❌ Error al actualizar tarea', 'error')
        });
    } else {
      this.tareaService.createTarea(this.currentTarea)
        .subscribe({
          next: () => {
            this.showToastMessage('✅ Tarea creada correctamente', 'success');
            this.loadTareas();
            this.cancelEdit();
          },
          error: () => this.showToastMessage('❌ Error al crear tarea', 'error')
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
  }

  viewTarea(tarea: Tarea) {
    this.viewingTarea = tarea;
  }

  confirmDelete(id: number) {
    this.tareaToDeleteId = id;
    this.showConfirmDelete = true;
  }

  deleteTareaConfirmado() {
    if (!this.tareaToDeleteId) return;

    this.loading = true;
    this.tareaService.deleteTarea(this.tareaToDeleteId).subscribe({
      next: () => {
        this.showToastMessage('✅ Tarea eliminada correctamente', 'success');
        this.loadTareas();
      },
      error: () => this.showToastMessage('❌ Error al eliminar tarea', 'error')
    });

    this.showConfirmDelete = false;
    this.tareaToDeleteId = null;
  }

  cancelEdit() {
    this.currentTarea = { nombre: '', descripcion: '', fechaEntrega: new Date(), asignaturaId: 0 };
    this.showForm = false;
    this.editingTarea = false;
  }

  cancelDelete() {
    this.showConfirmDelete = false;
    this.tareaToDeleteId = null;
  }

  validateForm(): boolean {
    if (!this.currentTarea.nombre?.trim()) {
      this.showToastMessage('❌ El nombre es requerido', 'error');
      return false;
    }
    if (!this.currentTarea.asignaturaId) {
      this.showToastMessage('❌ Debe seleccionar una asignatura', 'error');
      return false;
    }
    if (!this.currentTarea.fechaEntrega) {
      this.showToastMessage('❌ La fecha de entrega es requerida', 'error');
      return false;
    }
    return true;
  }

  getAsignaturaNombre(asignaturaId: number): string {
    const asignatura = this.asignaturas.find(a => a.id === asignaturaId);
    return asignatura ? asignatura.nombre : 'N/A';
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
