import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante, EstudianteDTO } from '../models/estudiante.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './estudiante.component.html',
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  currentEstudiante: EstudianteDTO = { nombre: '', apellido: '', email: '' };
  showForm = false;
  editingEstudiante = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private estudianteService: EstudianteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEstudiantes();
  }

  loadEstudiantes() {
    this.loading = true;
    this.estudianteService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Error al cargar estudiantes');
        this.loading = false;
      }
    });
  }

  saveEstudiante() {
    if (!this.validateForm()) return;

    this.loading = true;

    if (this.editingEstudiante && this.currentEstudiante.id) {
      this.estudianteService.updateEstudiante(this.currentEstudiante.id, this.currentEstudiante)
        .subscribe({
          next: () => {
            this.showSuccess('Estudiante actualizado correctamente');
            this.loadEstudiantes();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al actualizar estudiante')
        });
    } else {
      this.estudianteService.createEstudiante(this.currentEstudiante)
        .subscribe({
          next: () => {
            this.showSuccess('Estudiante creado correctamente');
            this.loadEstudiantes();
            this.cancelEdit();
          },
          error: (error) => this.showError('Error al crear estudiante')
        });
    }
  }

  editEstudiante(estudiante: Estudiante) {
    this.currentEstudiante = {
      id: estudiante.id,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      email: estudiante.email
    };
    this.editingEstudiante = true;
    this.showForm = true;
    this.clearMessages();
  }

  deleteEstudiante(id: number) {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.loading = true;
      this.estudianteService.deleteEstudiante(id).subscribe({
        next: () => {
          this.showSuccess('Estudiante eliminado correctamente');
          this.loadEstudiantes();
        },
        error: (error) => this.showError('Error al eliminar estudiante')
      });
    }
  }

  cancelEdit() {
    this.currentEstudiante = { nombre: '', apellido: '', email: '' };
    this.showForm = false;
    this.editingEstudiante = false;
    this.clearMessages();
  }

  validateForm(): boolean {
    if (!this.currentEstudiante.nombre?.trim()) {
      this.showError('El nombre es requerido');
      return false;
    }
    if (!this.currentEstudiante.apellido?.trim()) {
      this.showError('El apellido es requerido');
      return false;
    }
    if (!this.currentEstudiante.email?.trim()) {
      this.showError('El email es requerido');
      return false;
    }
    if (!this.isValidEmail(this.currentEstudiante.email)) {
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

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
