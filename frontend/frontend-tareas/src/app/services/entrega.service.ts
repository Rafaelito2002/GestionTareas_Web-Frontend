import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrega, EntregaDTO } from '../pages/models/entrega.model';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  private apiUrl = 'http://localhost:8080/api/entregas';

  constructor(private http: HttpClient) {}

  getEntregas(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.apiUrl);
  }

  getEntregasByTarea(tareaId: number): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(`${this.apiUrl}/tarea/${tareaId}`);
  }

  getEntregasByEstudiante(estudianteId: number): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(`${this.apiUrl}/estudiante/${estudianteId}`);
  }

  getEntrega(id: number): Observable<Entrega> {
    return this.http.get<Entrega>(`${this.apiUrl}/${id}`);
  }

  createEntrega(entrega: EntregaDTO): Observable<Entrega> {
    return this.http.post<Entrega>(this.apiUrl, entrega);
  }

  updateEntrega(id: number, entrega: EntregaDTO): Observable<Entrega> {
    return this.http.put<Entrega>(`${this.apiUrl}/${id}`, entrega);
  }

  deleteEntrega(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
