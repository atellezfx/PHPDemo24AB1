import { Component, OnInit } from '@angular/core';
import { MascotaComponent } from '../mascota/mascota.component';
import { Mascota } from '../../models/mascota';
import { mascotasPrueba } from '../../util/datos-prueba';
import { MascotaService } from '../../services/mascota.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ MascotaComponent ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  mascotas!:Mascota[];

  constructor( private mascotaSvc:MascotaService, private loginSvc:LoginService ) {}

  public ngOnInit(): void {
    const propietario = String(this.loginSvc.usuarioActual());
    this.mascotaSvc.lista(propietario).subscribe(
      arreglo => this.mascotas = arreglo
    );
  }

}
