export interface Entrega {
  id: number;
  estudianteId: number;
  tareaId: number;
  fechaEntrega: Date;
  archivo: string;
  calificacion: number;
  estudianteNombre?: string;
  estudianteApellido?: string;
  tareaNombre?: string;
  asignaturaNombre?: string;
}

export interface EntregaDTO {
  id?: number;
  estudianteId: number;
  tareaId: number;
  fechaEntrega: Date;
  archivo: string;
  calificacion?: number;
}
