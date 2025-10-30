import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AgregarTaller } from './modales/agregar-taller/agregar-taller';

@Component({
  selector: 'app-talleres',
  imports: [MatIconModule],
  templateUrl: './talleres.html',
  styleUrl: './talleres.css'
})
export class Talleres {

    constructor(private dialog: MatDialog) {}

  openAgregarTaller(): void {
    this.dialog.open(AgregarTaller, {
      width: '600px',
      panelClass: 'custom-modalbox',
    });
  }

}
