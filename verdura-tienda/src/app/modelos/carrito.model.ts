
export interface ItemCarrito {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

export class Carrito {
  items: ItemCarrito[] = [];

  agregarProducto(producto: ItemCarrito): void {
    const existente = this.items.find(item => item.id_producto === producto.id_producto);
    
    if (existente) {
      existente.cantidad += producto.cantidad;
    } else {
      this.items.push(producto);
    }
  }

  eliminarProducto(id_producto: number): void {
    this.items = this.items.filter(item => item.id_producto !== id_producto);
  }

  actualizarCantidad(id_producto: number, nuevaCantidad: number): void {
    const item = this.items.find(i => i.id_producto === id_producto);
    if (item && nuevaCantidad > 0) {
      item.cantidad = nuevaCantidad;
    }
  }

  limpiar(): void {
    this.items = [];
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  get cantidad(): number {
    return this.items.reduce((sum, item) => sum + item.cantidad, 0);
  }

  get totalFormato(): string {
    return `$${this.total.toFixed(2)}`;
  }

  get estaVacio(): boolean {
    return this.items.length === 0;
  }
}
