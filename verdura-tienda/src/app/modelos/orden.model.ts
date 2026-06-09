
export interface Orden {
  id_orden: number;
  id_cliente: number;
  numero_orden: string;
  fecha_creacion: Date;
  total: number;
  estado: 'Pendiente' | 'Procesada' | 'Entregada' | 'Cancelada';
  observaciones?: string;
}

export class OrdenDTO implements Orden {
  id_orden: number = 0;
  id_cliente: number = 0;
  numero_orden: string = '';
  fecha_creacion: Date = new Date();
  total: number = 0;
  estado: 'Pendiente' | 'Procesada' | 'Entregada' | 'Cancelada' = 'Pendiente';
  observaciones?: string = '';

  constructor(data?: Partial<Orden>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  get estadoEmoji(): string {
    const emojis: Record<string, string> = {
      'Pendiente': '⏳',
      'Procesada': '⚙️',
      'Entregada': '✅',
      'Cancelada': '❌'
    };
    return emojis[this.estado] || '';
  }

  get totalFormato(): string {
    return `$${this.total.toFixed(2)}`;
  }
}
