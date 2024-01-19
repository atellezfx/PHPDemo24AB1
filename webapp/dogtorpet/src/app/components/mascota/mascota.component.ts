import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {

  @Input()
  mascota!:Mascota;

  @Output()
  emisor = new EventEmitter<Mascota>();

  constructor() {}

  public confirmarEliminar( evt:Event ): void {

  }

}
