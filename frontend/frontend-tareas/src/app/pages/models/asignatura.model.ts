export interface Asignatura {
  id: number;
  nombre: string;
  descripcion: string;
  docenteId: number;
  docenteNombre?: string;
  docenteApellido?: string;
}

export interface AsignaturaDTO {
  id?: number;
  nombre: string;
  descripcion: string;
  docenteId: number;
}
