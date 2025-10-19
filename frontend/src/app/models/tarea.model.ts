export interface Tarea {
  id?: number;
  nombre: string;
  descripcion?: string;
  fechaEntrega: string;
  asignaturaId: number;
  asignaturaNombre?: string;
}
