
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrito, ItemCarrito } from '../modelos/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito = new BehaviorSubject<Carrito>(new Carrito());

  obtenerCarrito$(): Observable<Carrito> {
    return this.carrito.asObservable();
  }

  obtenerCarrito(): Carrito {
    return this.carrito.value;
  }

  agregarAlCarrito(item: ItemCarrito): void {
    const carrito = this.carrito.value;
    carrito.agregarProducto(item);
    this.carrito.next(carrito);
  }

  eliminarDelCarrito(id_producto: number): void {
    const carrito = this.carrito.value;
    carrito.eliminarProducto(id_producto);
    this.carrito.next(carrito);
  }

  actualizarCantidad(id_producto: number, cantidad: number): void {
    const carrito = this.carrito.value;
    carrito.actualizarCantidad(id_producto, cantidad);
    this.carrito.next(carrito);
  }

  vaciarCarrito(): void {
    const carrito = new Carrito();
    this.carrito.next(carrito);
  }

  obtenerTotal(): number {
    return this.carrito.value.total;
  }

  obtenerCantidadItems(): number {
    return this.carrito.value.cantidad;
  }

  obtenerItems(): ItemCarrito[] {
    return this.carrito.value.items;
  }

  estaVacio(): boolean {
    return this.carrito.value.estaVacio;
  }
}
