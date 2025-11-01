import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AdminDataService } from '../../../../../core/services/admin.data.service';

@Component({
  selector: 'app-agregar-taller',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './agregar-taller.html',
  styleUrl: './agregar-taller.css'
})
export class AgregarTaller implements OnInit {

  modoEdicion = false;
  idTaller: string | null = null;
  categorias: any[] = [];
  subcategorias: any[] = [];

  nuevoTaller = {
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    horario: '',
    modalidad: 'presencial',
    duracion: null as number | null,
    precio: null as number | null,
    cupo_total: null as number | null,
    id_categoria: '',
    id_subcategoria: '',
    estado: 'activo',
    imagen_url: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AgregarTaller>,
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

    // Si se reciben datos de taller, activar modo edición
    if (this.data && this.data.taller) {
      this.modoEdicion = true;
      this.idTaller = this.data.taller._id;
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
    if (this.nuevoTaller.id_categoria) {
      this.adminDataService.getSubcategoriasPorCategoria(this.nuevoTaller.id_categoria).subscribe({
        next: (res) => {
          this.subcategorias = res;
        },
        error: (err) => console.error('Error al cargar subcategorías:', err)
      });
    } else {
      this.subcategorias = [];
      this.nuevoTaller.id_subcategoria = '';
    }
  }

  cargarDatosEdicion(): void {
    const taller = this.data.taller;
    
    // Formatear fechas para el input type="date" (YYYY-MM-DD)
    const formatDateForInput = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    this.nuevoTaller = {
      nombre: taller.nombre || '',
      descripcion: taller.descripcion || '',
      fecha_inicio: formatDateForInput(taller.fecha_inicio),
      fecha_fin: formatDateForInput(taller.fecha_fin),
      horario: taller.horario || '',
      modalidad: taller.modalidad || 'presencial',
      duracion: taller.duracion || null,
      precio: taller.precio || null,
      cupo_total: taller.cupo_total || null,
      id_categoria: taller.id_categoria?._id || taller.id_categoria || '',
      id_subcategoria: taller.id_subcategoria?._id || taller.id_subcategoria || '',
      estado: taller.estado || 'activo',
      imagen_url: taller.imagen_url || ''
    };

    // Cargar subcategorías si hay categoría seleccionada
    if (this.nuevoTaller.id_categoria) {
      this.onCategoriaChange();
    }
  }

  guardarTaller(): void {
    // Validaciones básicas
    if (!this.nuevoTaller.nombre || !this.nuevoTaller.descripcion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    // Preparar datos para enviar
    const dataToSend = {
      ...this.nuevoTaller,
      // Asegurar que las fechas tengan formato completo si es necesario
      fecha_inicio: this.nuevoTaller.fecha_inicio ? `${this.nuevoTaller.fecha_inicio}T00:00:00.000Z` : '',
      fecha_fin: this.nuevoTaller.fecha_fin ? `${this.nuevoTaller.fecha_fin}T00:00:00.000Z` : ''
    };

    console.log('🟠 Enviando request:', dataToSend);

    if (this.modoEdicion && this.idTaller) {
      // Modo edición
      this.adminDataService.updateTaller(this.idTaller, dataToSend).subscribe({
        next: () => {
          console.log('✅ Taller actualizado correctamente');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('❌ Error al actualizar taller:', err);
          alert('Error al actualizar el taller');
        }
      });
    } else {
      // Modo creación
      this.adminDataService.addTaller(dataToSend).subscribe({
        next: () => {
          console.log('✅ Taller agregado correctamente');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('❌ Error al agregar taller:', err);
          alert('Error al agregar el taller');
        }
      });
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}