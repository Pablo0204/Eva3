
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteDTO } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes = new BehaviorSubject<ClienteDTO[]>([]);

  obtenerClientes$(): Observable<ClienteDTO[]> {
    return this.clientes.asObservable();
  }

  obtenerClientePorId(id: number): ClienteDTO | undefined {
    return this.clientes.value.find(c => c.id_cliente === id);
  }

  obtenerClientePorEmail(email: string): ClienteDTO | undefined {
    return this.clientes.value.find(c => c.email === email);
  }

  buscarClientes(termino: string): ClienteDTO[] {
    return this.clientes.value.filter(c =>
      c.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      c.apellido.toLowerCase().includes(termino.toLowerCase()) ||
      c.email.toLowerCase().includes(termino.toLowerCase())
    );
  }

  crearCliente(cliente: ClienteDTO): ClienteDTO {
    const clientes = this.clientes.value;
    cliente.id_cliente = Math.max(...clientes.map(c => c.id_cliente), 0) + 1;
    this.clientes.next([...clientes, cliente]);
    return cliente;
  }

  actualizarCliente(cliente: ClienteDTO): void {
    const clientes = this.clientes.value.map(c =>
      c.id_cliente === cliente.id_cliente ? cliente : c
    );
    this.clientes.next(clientes);
  }

  eliminarCliente(id: number): void {
    const clientes = this.clientes.value.filter(c => c.id_cliente !== id);
    this.clientes.next(clientes);
  }
}
