import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura, AsignaturaDTO } from '../pages/models/asignatura.model';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private apiUrl = 'http://localhost:8080/api/asignaturas';

  constructor(private http: HttpClient) {}

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.apiUrl);
  }

  getAsignaturasByDocente(docenteId: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}/docente/${docenteId}`);
  }

  getAsignatura(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}/${id}`);
  }

  createAsignatura(asignatura: AsignaturaDTO): Observable<Asignatura> {
    return this.http.post<Asignatura>(this.apiUrl, asignatura);
  }

  updateAsignatura(id: number, asignatura: AsignaturaDTO): Observable<Asignatura> {
    return this.http.put<Asignatura>(`${this.apiUrl}/${id}`, asignatura);
  }

  deleteAsignatura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
