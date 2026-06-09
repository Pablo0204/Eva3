
export interface DetalleOrden {
  id_detalle: number;
  id_orden: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  fecha_agregado: Date;
}

export class DetalleOrdenDTO implements DetalleOrden {
  id_detalle: number = 0;
  id_orden: number = 0;
  id_producto: number = 0;
  cantidad: number = 1;
  precio_unitario: number = 0;
  subtotal: number = 0;
  fecha_agregado: Date = new Date();

  constructor(data?: Partial<DetalleOrden>) {
    if (data) {
      Object.assign(this, data);
      this.calcularSubtotal();
    }
  }

  calcularSubtotal(): void {
    this.subtotal = this.cantidad * this.precio_unitario;
  }

  actualizarCantidad(nuevaCantidad: number): void {
    if (nuevaCantidad > 0) {
      this.cantidad = nuevaCantidad;
      this.calcularSubtotal();
    }
  }

  get subtotalFormato(): string {
    return `$${this.subtotal.toFixed(2)}`;
  }
}
