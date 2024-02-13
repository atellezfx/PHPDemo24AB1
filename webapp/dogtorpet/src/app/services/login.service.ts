import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../models/mensaje';
import { Token } from '../models/token';

export const USUARIO_ACTUAL = 'usuarioActual';
export const AUTH_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly servidor = `${environment.urlServidor}/login`;

  constructor( private router:Router, private client:HttpClient ) { }

  public login( usr:{username:string, password:string} ): Observable<Token|Mensaje> {
    return this.client.post<Token|Mensaje>(this.servidor, usr);
  }

  public logout():void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public usuarioActual(): string | null {
    return localStorage.getItem(USUARIO_ACTUAL);
  }

  public loggedIn(): boolean {
    return !!this.usuarioActual();
  }

}
