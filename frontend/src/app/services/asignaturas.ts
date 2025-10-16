import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class asignaturaService {
  private baseUrl='http://localhost:3000';

  constructor(private http:HttpClient){}

  getAsignatura(docenteId:number){
    return this.http.get('$${this.baseUrl}/asignaturas?docenteId=${docenteId}');
  }
  crearAsignatura(data: any){
    return this.http.post(`${this.baseUrl}/asignaturas`, data);
  }
}
