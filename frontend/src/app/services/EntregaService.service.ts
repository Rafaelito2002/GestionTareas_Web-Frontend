import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrega } from '../models/entrega.model';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  private apiUrl = 'http://localhost:8080/api/entregas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.apiUrl);
  }

  getById(id: number): Observable<Entrega> {
    return this.http.get<Entrega>(`${this.apiUrl}/${id}`);
  }

  getByTarea(tareaId: number): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(`${this.apiUrl}/tarea/${tareaId}`);
  }

  getByEstudiante(estudianteId: number): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(`${this.apiUrl}/estudiante/${estudianteId}`);
  }

  create(entrega: Entrega): Observable<Entrega> {
    return this.http.post<Entrega>(this.apiUrl, entrega);
  }

  update(id: number, entrega: Entrega): Observable<Entrega> {
    return this.http.put<Entrega>(`${this.apiUrl}/${id}`, entrega);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
