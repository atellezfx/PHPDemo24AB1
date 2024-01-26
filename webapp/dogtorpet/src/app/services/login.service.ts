import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { usuariosPrueba } from '../util/datos-prueba';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // TODO: Implementar la URL del servidor (backend)

  constructor( private router:Router ) { }

  public login( usr:{username:string, password:string} ): Observable<Usuario> {
    // TODO: Implementar el login a través del backend
    const result = usuariosPrueba.filter( u => u.username == usr.username )[0];
    if( result && result.password == usr.password ) {
      localStorage.setItem('usuarioActual', usr.username);
      return of(result);
    } else {
      return throwError( () => new Error('Credeciales Incorrectas') );
    }
  }

  public logout():void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public usuarioActual(): string | null {
    return localStorage.getItem('usuarioActual');
  }

  public loggedIn(): boolean {
    return !!this.usuarioActual();
  }

}
