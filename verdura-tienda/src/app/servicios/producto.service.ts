
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductoDTO, Producto } from '../modelos/producto.model';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos = new BehaviorSubject<ProductoDTO[]>([]);

  constructor(private apiService: ApiService) {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.apiService.obtenerProductos().subscribe(
      (datos: any[]) => {
        const productosDTO = datos.map(p => new ProductoDTO({
          id_producto: p.id_producto,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio_unitario: p.precio_unitario,
          stock: p.stock,
          id_categoria: p.id_categoria,
          imagen_url: p.imagen_url,
          estado: p.estado
        }));
        this.productos.next(productosDTO);
      },
      error => console.error('Error cargando productos:', error)
    );
  }

  obtenerProductos$(): Observable<ProductoDTO[]> {
    return this.productos.asObservable();
  }

  obtenerProductoPorId(id: number): ProductoDTO | undefined {
    return this.productos.value.find(p => p.id_producto === id);
  }

  obtenerProductosPorCategoria(idCategoria: number): ProductoDTO[] {
    return this.productos.value.filter(p => p.id_categoria === idCategoria);
  }

  buscarProductos(termino: string): ProductoDTO[] {
    return this.productos.value.filter(p =>
      p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(termino.toLowerCase())
    );
  }

  crearProducto(producto: ProductoDTO): void {
    this.apiService.crearProducto(producto).subscribe(
      (nuevoProducto: any) => {
        const productos = this.productos.value;
        this.productos.next([...productos, new ProductoDTO(nuevoProducto)]);
      },
      error => console.error('Error creando producto:', error)
    );
  }

  actualizarProducto(producto: ProductoDTO): void {
    this.apiService.actualizarProducto(producto.id_producto, producto).subscribe(
      () => this.cargarProductos(),
      error => console.error('Error actualizando producto:', error)
    );
  }

  eliminarProducto(id: number): void {
    this.apiService.eliminarProducto(id).subscribe(
      () => this.cargarProductos(),
      error => console.error('Error eliminando producto:', error)
    );
  }

  decrementarStock(id: number, cantidad: number): void {
    const producto = this.obtenerProductoPorId(id);
    if (producto) {
      producto.stock -= cantidad;
      this.actualizarProducto(producto);
    }
  }

  incrementarStock(id: number, cantidad: number): void {
    const producto = this.obtenerProductoPorId(id);
    if (producto) {
      producto.stock += cantidad;
      this.actualizarProducto(producto);
    }
  }
}
