import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AdminDataService } from '../../../../../core/services/admin.data.service';

@Component({
  selector: 'app-agregar-servicio',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './agregar-servicios.html',
  styleUrl: './agregar-servicios.css'
})
export class AgregarServicio implements OnInit {

  modoEdicion = false;
  idServicio: string | null = null;
  categorias: any[] = [];
  subcategorias: any[] = [];

  nuevoServicio = {
    titulo: '',
    descripcion: '',
    id_categoria: '',
    id_subcategoria: '',
    estado: 'activo',
    imagen_url: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AgregarServicio>,
    private adminDataService: AdminDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Si se pasan categorías en los datos, usarlas
    if (this.data && this.data.categorias) {
      this.categorias = this.data.categorias;
    } else {
      this.cargarCategorias();
    }

    // Si se reciben datos de servicio, activar modo edición
    if (this.data && this.data.servicio) {
      this.modoEdicion = true;
      this.idServicio = this.data.servicio._id;
      this.cargarDatosEdicion();
    }
  }

  cargarCategorias(): void {
    this.adminDataService.getCategorias().subscribe({
      next: (res) => {
        this.categorias = res;
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  onCategoriaChange(): void {
    if (this.nuevoServicio.id_categoria) {
      this.adminDataService.getSubcategoriasPorCategoria(this.nuevoServicio.id_categoria).subscribe({
        next: (res) => {
          this.subcategorias = res;
        },
        error: (err) => console.error('Error al cargar subcategorías:', err)
      });
    } else {
      this.subcategorias = [];
      this.nuevoServicio.id_subcategoria = '';
    }
  }

  cargarDatosEdicion(): void {
    const servicio = this.data.servicio;
    
    this.nuevoServicio = {
      titulo: servicio.titulo || '',
      descripcion: servicio.descripcion || '',
      id_categoria: servicio.id_categoria?._id || servicio.id_categoria || '',
      id_subcategoria: servicio.id_subcategoria?._id || servicio.id_subcategoria || '',
      estado: servicio.estado || 'activo',
      imagen_url: servicio.imagen_url || ''
    };

    // Cargar subcategorías si hay categoría seleccionada
    if (this.nuevoServicio.id_categoria) {
      this.onCategoriaChange();
    }
  }

  guardarServicio(): void {
    // Validaciones básicas
    if (!this.nuevoServicio.titulo || !this.nuevoServicio.descripcion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    console.log('🟠 Enviando request:', this.nuevoServicio);

    if (this.modoEdicion && this.idServicio) {
      // Modo edición
      this.adminDataService.updateServicio(this.idServicio, this.nuevoServicio).subscribe({
        next: () => {
          console.log('✅ Servicio actualizado correctamente');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('❌ Error al actualizar servicio:', err);
          alert('Error al actualizar el servicio');
        }
      });
    } else {
      // Modo creación
      this.adminDataService.addServicio(this.nuevoServicio).subscribe({
        next: () => {
          console.log('✅ Servicio agregado correctamente');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('❌ Error al agregar servicio:', err);
          alert('Error al agregar el servicio');
        }
      });
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}