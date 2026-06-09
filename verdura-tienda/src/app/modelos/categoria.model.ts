
export interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion?: string;
  estado: 'Activo' | 'Inactivo';
}

export class CategoriaDTO implements Categoria {
  id_categoria: number = 0;
  nombre: string = '';
  descripcion?: string = '';
  estado: 'Activo' | 'Inactivo' = 'Activo';

  constructor(data?: Partial<Categoria>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
