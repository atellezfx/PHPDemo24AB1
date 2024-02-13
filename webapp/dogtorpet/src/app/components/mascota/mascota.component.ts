import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mascota } from '../../models/mascota';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarComponent } from '../eliminar/eliminar.component';

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

  constructor( private modalSvc: NgbModal ) {}

  public confirmarEliminar( evt:Event ): void {
    const dialogo = this.modalSvc.open( EliminarComponent );
    dialogo.componentInstance.mensaje = `¿Estás seguro de eliminar el registro de ${this.mascota.nombre}?`;
    dialogo.result.then( opcion => {
      if( opcion ) this.emisor.emit( this.mascota );
    } );
    evt.stopPropagation();
  }

}
