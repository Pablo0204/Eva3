
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/${id}`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productos`, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/productos/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/productos/${id}`);
  }

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categorias`, categoria);
  }

  obtenerClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  }

  crearCliente(cliente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clientes`, cliente);
  }

  obtenerOrdenes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ordenes`);
  }

  obtenerOrdenPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ordenes/${id}`);
  }

  crearOrden(orden: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ordenes`, orden);
  }

  actualizarEstadoOrden(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ordenes/${id}`, { estado });
  }

  obtenerDetallesOrden(idOrden: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/detalles-orden/${idOrden}`);
  }

  crearDetalleOrden(detalle: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/detalles-orden`, detalle);
  }

  obtenerProductosMasVendidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reportes/productos-mas-vendidos`);
  }

  probarConexion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/test`);
  }
}
