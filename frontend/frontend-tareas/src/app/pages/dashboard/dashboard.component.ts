import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../services/estudiante.service';
import { DocenteService } from '../../services/docente.service';
import { TareaService } from '../../services/tarea.service';
import { EntregaService } from '../../services/entrega.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { AuthService } from '../../services/AuthService.service';
import { Estudiante } from '../models/estudiante.model';
import { Docente } from '../models/docente.model';
import { Tarea } from '../models/tarea.model';
import { Entrega } from '../models/entrega.model';
import { Asignatura } from '../models/asignatura.model';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // Datos del usuario
  currentUser: any = null;
  isEstudiante = false;
  isDocente = false;

  // Estadísticas generales
  estudiantesCount = 0;
  docentesCount = 0;
  tareasCount = 0;
  entregasCount = 0;

  today: Date = new Date();

  // Datos específicos por rol
  misAsignaturas: Asignatura[] = [];
  misAsignaturasCount = 0;
  misTareasPendientes = 0;
  misTareasProximas: Tarea[] = [];
  misCalificaciones: Entrega[] = [];
  entregasPorCalificar: Entrega[] = [];

  constructor(
    private estudianteService: EstudianteService,
    private docenteService: DocenteService,
    private tareaService: TareaService,
    private entregaService: EntregaService,
    private asignaturaService: AsignaturaService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.loadGeneralStatistics();
    this.loadRoleSpecificData();
  }

  loadUserData() {
    const userJson = localStorage.getItem('currentUser');
    this.currentUser = userJson ? JSON.parse(userJson) : null;
    this.isEstudiante = this.authService.isEstudiante();
    this.isDocente = this.authService.isDocente();
  }

  getRoleDescription(): string {
    if (this.isDocente) {
      return 'Panel de Docente - Gestión de asignaturas y tareas';
    } else if (this.isEstudiante) {
      return 'Panel de Estudiante - Visualización de tareas y entregas';
    }
    return 'Usuario';
  }

  loadGeneralStatistics() {
    this.estudianteService.getEstudiantes().subscribe(data => {
      this.estudiantesCount = data.length;
    });

    this.docenteService.getDocentes().subscribe(data => {
      this.docentesCount = data.length;
    });

    this.tareaService.getTareas().subscribe(data => {
      this.tareasCount = data.length;
    });

    this.entregaService.getEntregas().subscribe(data => {
      this.entregasCount = data.length;
    });
  }

  loadRoleSpecificData() {
    if (this.isDocente && this.currentUser?.usuarioId) {
      this.loadDocenteData();
    } else if (this.isEstudiante && this.currentUser?.usuarioId) {
      this.loadEstudianteData();
    }
  }

  loadDocenteData() {
    // Cargar asignaturas del docente
    this.asignaturaService.getAsignaturasByDocente(this.currentUser.usuarioId)
      .subscribe(asignaturas => {
        this.misAsignaturas = asignaturas;
        this.misAsignaturasCount = asignaturas.length;
      });

    // Cargar entregas por calificar
    this.entregaService.getEntregas().subscribe(entregas => {
      this.entregasPorCalificar = entregas.filter(e => !e.calificacion);
    });
  }

  loadEstudianteData() {
    // Cargar tareas próximas
    this.tareaService.getTareas().subscribe(tareas => {
      const hoy = new Date();
      this.misTareasProximas = tareas
        .filter(t => new Date(t.fechaEntrega) > hoy)
        .sort((a, b) => new Date(a.fechaEntrega).getTime() - new Date(b.fechaEntrega).getTime())
        .slice(0, 5);

      this.misTareasPendientes = this.misTareasProximas.length;
    });

    // Cargar calificaciones del estudiante
    this.entregaService.getEntregasByEstudiante(this.currentUser.usuarioId)
      .subscribe(entregas => {
        this.misCalificaciones = entregas
          .filter(e => e.calificacion)
          .sort((a, b) => new Date(b.fechaEntrega).getTime() - new Date(a.fechaEntrega).getTime())
          .slice(0, 5);
      });
  }


}
