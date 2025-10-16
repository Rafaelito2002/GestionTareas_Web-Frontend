import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private baseUrl= 'http://localhost:3000';

  constructor(private http: HttpClient){}

  getTareasAsignatura(asignaturaId:number){
    return this.http.get(`${this.baseUrl}/tareas?asignaturaId=${asignaturaId}`);
  }

  crearTarea(data:any){
    return this.http.post(`${this.baseUrl}/tareas`, data);
  }
}
