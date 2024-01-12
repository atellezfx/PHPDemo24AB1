import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req:HttpRequest<any>, next) => {
  return next(req);
};
