import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../servicios/producto.service';
import { CarritoService } from '../../servicios/carrito.service';
import { ProductoDTO } from '../../modelos/producto.model';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  productos: ProductoDTO[] = [];
  productosDestacados: ProductoDTO[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos$().subscribe(productos => {
      this.productos = productos;
      this.productosDestacados = productos.slice(0, 2);
    });
  }

  agregarAlCarrito(producto: ProductoDTO): void {
    this.carritoService.agregarAlCarrito({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      precio: producto.precio_unitario,
      cantidad: 1,
      imagen: producto.imagen_url
    });
    alert(`${producto.nombre} agregado al carrito`);
  }
}
