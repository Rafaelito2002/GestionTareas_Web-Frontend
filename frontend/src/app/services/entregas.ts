import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({  providedIn: 'root' })
export class EntregaService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEntregasPorTarea(tareaId: number) {
    return this.http.get(`${this.baseUrl}/entregas?tareaId=${tareaId}`);
  }

  subirEntrega(data: FormData) {
    return this.http.post(`${this.baseUrl}/entregas`, data);
  }

  calificarEntrega(id: number, calificacion: number) {
    return this.http.put(`${this.baseUrl}/entregas/${id}`, { calificacion });
  }

}
