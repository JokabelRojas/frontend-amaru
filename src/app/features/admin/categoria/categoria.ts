import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categoria',
  imports: [MatIconModule, CommonModule ],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria {
activeTab: 'categorias' | 'subcategorias' = 'categorias';

  categorias = [
    {
      id: 1,
      nombre: 'Electrónica',
      tipo: 'Principal',
      descripcion: 'Dispositivos tecnológicos y gadgets.',
      estado: 'Activo',
      fechaCreacion: '2025-09-14',
    },
    {
      id: 2,
      nombre: 'Hogar',
      tipo: 'Secundario',
      descripcion: 'Artículos para el hogar y cocina.',
      estado: 'Inactivo',
      fechaCreacion: '2025-08-10',
    },
  ];

  subcategorias = [
    {
      id: 1,
      categoria: 'Electrónica',
      descripcion: 'Teléfonos móviles y accesorios.',
      estado: 'Activo',
      fechaCreacion: '2025-09-20',
    },
    {
      id: 2,
      categoria: 'Hogar',
      descripcion: 'Electrodomésticos pequeños.',
      estado: 'Inactivo',
      fechaCreacion: '2025-09-25',
    },
  ];

}
