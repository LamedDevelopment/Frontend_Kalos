import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUtils } from './components/authentication/auth/auth.utils';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('accessToken');
    console.log('Interceptor', token)
    let modifiedRequest;

    if (token && !AuthUtils.isTokenExpired(token)) {
      // console.log(token);
      request = request.clone({
        setHeaders: {
          'x-token': `${token}`,
        },
      });

    }
    return next.handle(request).pipe(
      catchError ((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/auth/login');
        }

        return throwError(err);

      })
    );


  }
}
