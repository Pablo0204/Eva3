
export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion?: string;
  precio_unitario: number;
  stock: number;
  id_categoria: number;
  imagen_url?: string;
  fecha_creacion: Date;
  estado: 'Disponible' | 'Descontinuado';
}

export class ProductoDTO implements Producto {
  id_producto: number = 0;
  nombre: string = '';
  descripcion?: string = '';
  precio_unitario: number = 0;
  stock: number = 0;
  id_categoria: number = 0;
  imagen_url?: string = '';
  fecha_creacion: Date = new Date();
  estado: 'Disponible' | 'Descontinuado' = 'Disponible';

  constructor(data?: Partial<Producto>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  get disponible(): boolean {
    return this.estado === 'Disponible' && this.stock > 0;
  }

  get totalInventario(): number {
    return this.stock;
  }
}
