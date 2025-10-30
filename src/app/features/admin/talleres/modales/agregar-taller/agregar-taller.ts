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
export class AgregarTaller {

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
    modalidad: '',
    duracion: null,
    precio: null,
    cupo_total: null,
    id_categoria: '',
    id_subcategoria: '',
    imagen_url: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AgregarTaller>,
    private adminDataService: AdminDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.taller) {
      this.modoEdicion = true;
      this.idTaller = data.taller._id;
      this.nuevoTaller = { ...data.taller };
    }
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.adminDataService.getCategorias().subscribe({
      next: (res) => {
        this.categorias = res;
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  cargarSubcategorias(): void {
    if (!this.nuevoTaller.id_categoria) return;
    this.adminDataService.getSubcategoriasPorCategoria(this.nuevoTaller.id_categoria).subscribe({
      next: (res) => {
        this.subcategorias = res;
      },
      error: (err) => console.error('Error al cargar subcategorías:', err)
    });
  }

  guardarTaller(): void {
    // ✅ Limpiamos las horas si no quieres enviarlas
    const dataToSend = {
      ...this.nuevoTaller,
      fecha_inicio: this.nuevoTaller.fecha_inicio ? this.nuevoTaller.fecha_inicio.split('T')[0] : '',
      fecha_fin: this.nuevoTaller.fecha_fin ? this.nuevoTaller.fecha_fin.split('T')[0] : ''
    };

    // ✅ Mostrar el cuerpo del request en consola
    console.log('🟠 Enviando request:', dataToSend);

    if (this.modoEdicion && this.idTaller) {
      this.adminDataService.updateTaller(this.idTaller, dataToSend).subscribe({
        next: () => {
          console.log('✅ Taller actualizado correctamente');
          this.dialogRef.close(true);
        },
        error: (err) => console.error('❌ Error al actualizar taller:', err)
      });
    } else {
      this.adminDataService.addTaller(dataToSend).subscribe({
        next: () => {
          console.log('✅ Taller agregado correctamente');
          this.dialogRef.close(true);
        },
        error: (err) => console.error('❌ Error al agregar taller:', err)
      });
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
