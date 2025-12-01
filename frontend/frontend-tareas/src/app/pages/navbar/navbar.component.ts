import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/dashboard" class="text-xl font-bold">
              📚 Gestión de Tareas
            </a>
          </div>

          <div class="flex space-x-4">
            <a routerLink="/dashboard"
               class="px-3 py-2 rounded hover:bg-blue-700 transition">
              Dashboard
            </a>
            <a routerLink="/estudiantes"
               class="px-3 py-2 rounded hover:bg-blue-700 transition">
              Estudiantes
            </a>
            <a routerLink="/docentes"
               class="px-3 py-2 rounded hover:bg-blue-700 transition">
              Docentes
            </a>
            <a routerLink="/asignaturas"
               class="px-3 py-2 rounded hover:bg-blue-700 transition">
              Asignaturas
            </a>
            <a routerLink="/tareas"
               class="px-3 py-2 rounded hover:bg-blue-700 transition">
              Tareas
            </a>
            <a routerLink="/entregas"
               class="px-3 py-2 rounded hover:bg-blue-700 transition">
              Entregas
            </a>
            <button class="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent { }
