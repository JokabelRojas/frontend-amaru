import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AgregarTaller } from './modales/agregar-taller/agregar-taller';
import { AdminDataService } from '../../../core/services/admin.data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-talleres',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './talleres.html',
  styleUrl: './talleres.css'
})
export class Talleres {
  categorias: any[] = [];
  subcategorias: any[] = [];
  talleres: any[] = [];

  filtros = {
    id_categoria: '',
    id_subcategoria: '',
    estado: '',
    fecha_inicio: '',
    fecha_fin: ''
  };

  constructor(
    private dialog: MatDialog,
    private adminDataService: AdminDataService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarTalleres();
  }

  cargarCategorias(): void {
    this.adminDataService.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  onCategoriaChange(): void {
    if (this.filtros.id_categoria) {
      this.adminDataService.getSubcategoriasPorCategoria(this.filtros.id_categoria).subscribe({
        next: (data) => (this.subcategorias = data),
        error: (err) => console.error('Error al cargar subcategorías', err)
      });
    } else {
      this.subcategorias = [];
      this.filtros.id_subcategoria = '';
    }
  }

  cargarTalleres(): void {
    this.adminDataService.getTalleresFiltrados(this.filtros).subscribe({
      next: (data) => (this.talleres = data),
      error: (err) => console.error('Error al cargar talleres', err)
    });
  }

  openAgregarTaller(): void {
    const dialogRef = this.dialog.open(AgregarTaller, {
      width: '600px',
      panelClass: 'custom-modalbox',
      data: { 
        categorias: this.categorias
      }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === true) {
        this.cargarTalleres();
      }
    });
  }

  editarTaller(taller: any): void {
    const dialogRef = this.dialog.open(AgregarTaller, {
      width: '600px',
      panelClass: 'custom-modalbox',
      data: { 
        taller: taller,
        categorias: this.categorias
      }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === true) {
        this.cargarTalleres();
      }
    });
  }

  eliminarTaller(id: string): void {
    if (confirm('¿Seguro que deseas eliminar este taller?')) {
      this.adminDataService.deleteTaller(id).subscribe({
        next: () => {
          alert('Taller eliminado correctamente');
          this.cargarTalleres();
        },
        error: (err) => console.error('Error al eliminar taller', err)
      });
    }
  }
}