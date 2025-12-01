import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocenteService } from '../../services/docente.service';
import { Docente, DocenteDTO } from '../models/docente.model';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente.component.html'
})
export class DocentesComponent implements OnInit {
  docentes: Docente[] = [];
  currentDocente: DocenteDTO = { nombre: '', apellido: '', email: '' };
  showForm = false;
  editingDocente = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private docenteService: DocenteService) {}

  ngOnInit() {
    this.loadDocentes();
  }

  loadDocentes() {
    this.loading = true;
    this.docenteService.getDocentes().subscribe({
      next: (data) => {
        this.docentes = data;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Error al cargar docentes');
        this.loading = false;
      }
    });
  }

  saveDocente() {
    if (!this.validateForm()) return;

    this.loading = true;

    if (this.editingDocente && this.currentDocente.id) {
      this.docenteService.updateDocente(this.currentDocente.id, this.currentDocente)
        .subscribe({
          next: () => {
            this.showSuccess('Docente actualizado correctamente');
            this.loadDocentes();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al actualizar docente')
        });
    } else {
      this.docenteService.createDocente(this.currentDocente)
        .subscribe({
          next: () => {
            this.showSuccess('Docente creado correctamente');
            this.loadDocentes();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al crear docente')
        });
    }
  }

  editDocente(docente: Docente) {
    this.currentDocente = {
      id: docente.id,
      nombre: docente.nombre,
      apellido: docente.apellido,
      email: docente.email
    };
    this.editingDocente = true;
    this.showForm = true;
    this.clearMessages();
  }

  deleteDocente(id: number) {
    if (confirm('¿Estás seguro de eliminar este docente?')) {
      this.loading = true;
      this.docenteService.deleteDocente(id).subscribe({
        next: () => {
          this.showSuccess('Docente eliminado correctamente');
          this.loadDocentes();
        },
        error: (error) => this.showError('Error al eliminar docente')
      });
    }
  }

  cancelEdit() {
    this.currentDocente = { nombre: '', apellido: '', email: '' };
    this.showForm = false;
    this.editingDocente = false;
    this.clearMessages();
  }

  validateForm(): boolean {
    if (!this.currentDocente.nombre?.trim()) {
      this.showError('El nombre es requerido');
      return false;
    }
    if (!this.currentDocente.apellido?.trim()) {
      this.showError('El apellido es requerido');
      return false;
    }
    if (!this.currentDocente.email?.trim()) {
      this.showError('El email es requerido');
      return false;
    }
    if (!this.isValidEmail(this.currentDocente.email)) {
      this.showError('El email no es válido');
      return false;
    }
    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
