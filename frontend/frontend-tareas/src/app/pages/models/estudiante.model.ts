export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaRegistro: Date;
}

export interface EstudianteDTO {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaRegistro?: Date;
}
