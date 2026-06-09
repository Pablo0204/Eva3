
export interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  fecha_registro: Date;
  estado: 'Activo' | 'Inactivo';
}

export class ClienteDTO implements Cliente {
  id_cliente: number = 0;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono?: string = '';
  direccion?: string = '';
  ciudad?: string = '';
  fecha_registro: Date = new Date();
  estado: 'Activo' | 'Inactivo' = 'Activo';

  constructor(data?: Partial<Cliente>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`.trim();
  }
}
