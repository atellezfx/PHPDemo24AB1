import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_TOKEN, LoginService, USUARIO_ACTUAL } from '../../services/login.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Token } from '../../models/token';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario:FormGroup;
  mensajeError:string = '';

  constructor( private builder:FormBuilder, private loginSvc:LoginService, private router:Router ) {
    this.formulario = builder.group( {
      username:[''],
      password:['']
    } );
  }

  public enviarDatos() {
    const credenciales = this.formulario.value;
    this.loginSvc.login( credenciales ).subscribe( {
      next: datos => this.procesarRespuesta( datos, credenciales ),
      error: datos => this.mensajeError = datos
    } );
  }

  public procesarRespuesta(datos:Token|Mensaje, usuario:Usuario): void {
    if('token' in datos) {
      localStorage.setItem( USUARIO_ACTUAL, usuario.username );
      localStorage.setItem( AUTH_TOKEN, datos.token );
      this.router.navigateByUrl('/catalogo');
    } else {
      localStorage.removeItem( USUARIO_ACTUAL );
      localStorage.removeItem( AUTH_TOKEN );
      this.mensajeError = `${datos.codigo}: ${datos.mensaje}`;
    }
  }

}
