import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsignaturaService } from '../../services/asignatura.service';
import { DocenteService } from '../../services/docente.service';
import { Asignatura, AsignaturaDTO } from '../models/asignatura.model';
import { Docente } from '../models/docente.model';

@Component({
  selector: 'app-asignaturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignaturas.component.html'
})
export class AsignaturasComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  docentes: Docente[] = [];
  currentAsignatura: AsignaturaDTO = { nombre: '', descripcion: '', docenteId: 0 };
  showForm = false;
  editingAsignatura = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private asignaturaService: AsignaturaService,
    private docenteService: DocenteService
  ) {}

  ngOnInit() {
    this.loadAsignaturas();
    this.loadDocentes();
  }

  loadAsignaturas() {
    this.loading = true;
    this.asignaturaService.getAsignaturas().subscribe({
      next: (data) => {
        this.asignaturas = data;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Error al cargar asignaturas');
        this.loading = false;
      }
    });
  }

  loadDocentes() {
    this.docenteService.getDocentes().subscribe({
      next: (data) => {
        this.docentes = data;
      },
      error: (error) => {
        this.showError('Error al cargar docentes');
      }
    });
  }

  saveAsignatura() {
    if (!this.validateForm()) return;

    this.loading = true;

    if (this.editingAsignatura && this.currentAsignatura.id) {
      this.asignaturaService.updateAsignatura(this.currentAsignatura.id, this.currentAsignatura)
        .subscribe({
          next: () => {
            this.showSuccess('Asignatura actualizada correctamente');
            this.loadAsignaturas();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al actualizar asignatura')
        });
    } else {
      this.asignaturaService.createAsignatura(this.currentAsignatura)
        .subscribe({
          next: () => {
            this.showSuccess('Asignatura creada correctamente');
            this.loadAsignaturas();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al crear asignatura')
        });
    }
  }

  editAsignatura(asignatura: Asignatura) {
    this.currentAsignatura = {
      id: asignatura.id,
      nombre: asignatura.nombre,
      descripcion: asignatura.descripcion || '',
      docenteId: asignatura.docenteId
    };
    this.editingAsignatura = true;
    this.showForm = true;
    this.clearMessages();
  }

  deleteAsignatura(id: number) {
    if (confirm('¿Estás seguro de eliminar esta asignatura?')) {
      this.loading = true;
      this.asignaturaService.deleteAsignatura(id).subscribe({
        next: () => {
          this.showSuccess('Asignatura eliminada correctamente');
          this.loadAsignaturas();
        },
        error: (error) => this.showError('Error al eliminar asignatura')
      });
    }
  }

  cancelEdit() {
    this.currentAsignatura = { nombre: '', descripcion: '', docenteId: 0 };
    this.showForm = false;
    this.editingAsignatura = false;
    this.clearMessages();
  }

  validateForm(): boolean {
    if (!this.currentAsignatura.nombre?.trim()) {
      this.showError('El nombre es requerido');
      return false;
    }
    if (!this.currentAsignatura.docenteId) {
      this.showError('Debe seleccionar un docente');
      return false;
    }
    return true;
  }

  getDocenteNombre(docenteId: number): string {
    const docente = this.docentes.find(d => d.id === docenteId);
    return docente ? `${docente.nombre} ${docente.apellido}` : 'N/A';
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
}
