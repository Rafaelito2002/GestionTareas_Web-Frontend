export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaRegistro: Date;
}

export interface DocenteDTO {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaRegistro?: Date;
}
