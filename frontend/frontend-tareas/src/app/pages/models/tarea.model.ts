export interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  fechaEntrega: Date;
  asignaturaId: number;
  asignaturaNombre?: string;
}

export interface TareaDTO {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaEntrega: Date;
  asignaturaId: number;
}
