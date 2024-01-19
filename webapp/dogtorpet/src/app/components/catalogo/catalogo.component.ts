import { Component, OnInit } from '@angular/core';
import { MascotaComponent } from '../mascota/mascota.component';
import { Mascota } from '../../models/mascota';
import { mascotasPrueba } from '../../util/datos-prueba';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ MascotaComponent ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  mascotas!:Mascota[];

  constructor() {}

  public ngOnInit(): void {
    this.mascotas = mascotasPrueba;
  }

}
