export interface Entrega {
  id?: number;
  estudianteId: number;
  tareaId: number;
  fechaEntrega: string;
  archivo?: string;
  calificacion?: number;
  estudianteNombre?: string;
  estudianteApellido?: string;
  tareaNombre?: string;
  asignaturaNombre?: string;
}
