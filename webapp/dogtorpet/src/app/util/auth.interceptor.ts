import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { environment } from '../../environment/environment';

export const authInterceptor: HttpInterceptorFn = (req:HttpRequest<any>, next):Observable<HttpEvent<any>> => {
  const service = inject(LoginService);
  const esMiServidor = req.url.startsWith( environment.urlServidor );
  const token = localStorage.getItem('token');
  if( service.loggedIn() && esMiServidor ) {
    req = req.clone({
      setHeaders: {'Authorization':`Bearer ${token}`}
    });
  }
  console.log('URL: ', req.url);
  return next(req);
};
