
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrdenDTO } from '../modelos/orden.model';
import { DetalleOrdenDTO } from '../modelos/detalle-orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private ordenes = new BehaviorSubject<OrdenDTO[]>([]);
  private detallesOrden = new BehaviorSubject<DetalleOrdenDTO[]>([]);

  obtenerOrdenes$(): Observable<OrdenDTO[]> {
    return this.ordenes.asObservable();
  }

  obtenerOrdenPorId(id: number): OrdenDTO | undefined {
    return this.ordenes.value.find(o => o.id_orden === id);
  }

  obtenerOrdenesPorCliente(idCliente: number): OrdenDTO[] {
    return this.ordenes.value.filter(o => o.id_cliente === idCliente);
  }

  obtenerDetallesOrden(idOrden: number): DetalleOrdenDTO[] {
    return this.detallesOrden.value.filter(d => d.id_orden === idOrden);
  }

  crearOrden(orden: OrdenDTO): OrdenDTO {
    const ordenes = this.ordenes.value;
    orden.id_orden = Math.max(...ordenes.map(o => o.id_orden), 0) + 1;
    orden.numero_orden = `ORD-${String(this.proximoNumeroOrden).padStart(3, '0')}-${new Date().getFullYear()}`;
    this.proximoNumeroOrden++;
    this.ordenes.next([...ordenes, orden]);
    return orden;
  }

  agregarDetalleOrden(detalle: DetalleOrdenDTO): void {
    const detalles = this.detallesOrden.value;
    detalle.id_detalle = Math.max(...detalles.map(d => d.id_detalle), 0) + 1;
    this.detallesOrden.next([...detalles, detalle]);
  }

  actualizarEstadoOrden(idOrden: number, nuevoEstado: string): void {
    const ordenes = this.ordenes.value.map(o => {
      if (o.id_orden === idOrden) {
        o.estado = nuevoEstado as 'Pendiente' | 'Procesada' | 'Entregada' | 'Cancelada';
      }
      return o;
    });
    this.ordenes.next(ordenes);
  }

  calcularTotalOrden(idOrden: number): number {
    return this.detallesOrden.value
      .filter(d => d.id_orden === idOrden)
      .reduce((sum, d) => sum + d.subtotal, 0);
  }

  obtenerReporteProductosMasVendidos() {
    const reporte: { [key: number]: { cantidad: number; ingresos: number } } = {};
    
    this.detallesOrden.value.forEach(detalle => {
      if (!reporte[detalle.id_producto]) {
        reporte[detalle.id_producto] = { cantidad: 0, ingresos: 0 };
      }
      reporte[detalle.id_producto].cantidad += detalle.cantidad;
      reporte[detalle.id_producto].ingresos += detalle.subtotal;
    });

    return reporte;
  }
}
