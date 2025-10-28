import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminDataService } from '../../../core/services/admin.data.service';

@Component({
  selector: 'app-categoria',
  imports: [MatIconModule, CommonModule ],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria {
   activeTab: 'categorias' | 'subcategorias' = 'categorias';

  categorias: any[] = [];
  subcategorias: any[] = [];

  constructor(private adminDataService: AdminDataService) {}

  ngOnInit(): void {
    this.cargarCategoriasYSubcategorias();
  }

  cargarCategoriasYSubcategorias(): void {
    this.adminDataService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.cargarSubcategorias();
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }


  cargarSubcategorias(): void {
    this.adminDataService.getSubcategorias().subscribe({
      next: (data) => {
        this.subcategorias = data;

        this.subcategorias.forEach((subcat) => {
          if (subcat.id_categoria) {
            this.adminDataService.getCategoriaPorId(subcat.id_categoria._id).subscribe({
              next: (categoria) => {
                subcat.categoria = categoria.nombre;
              },
              error: (err) => {
                console.error(`Error al obtener categoría ${subcat.id_categoria}:`, err);
                subcat.categoria = 'Sin categoría';
              }
            });
          } else {
            subcat.categoria = 'Sin categoría';
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar subcategorías:', err);
      }
    });
  }



}
