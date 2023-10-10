import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { AuthUtils } from './auth.utils';
import { ApiServiceHttp } from 'src/app/pages/services/api.service';
import { catchError } from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    private readonly methods = {
        'GET': 'See',
        'POST': 'Create',
        'PUT': 'Update',
        'DELETE': 'Delete'
    };

    /**
     * Constructor
     */
    constructor(private _authService: AuthService, private _apiServiceHttp:ApiServiceHttp)
    {

    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();
        let token = this._authService.accessToken
        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        if ( token && !AuthUtils.isTokenExpired(token) )
        {
            console.log(token)
            newReq = req.clone({
                headers: req.headers.set('x-token', token),
                body:null,
            });
            console.log(newReq)
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error:HttpErrorResponse) => {
                console.log(error)
                // Catch "401 Unauthorized" responses
                if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    // Sign out
                    this._authService.signOut();

                    // Reload the app
                    location.reload();
                }

                return throwError(error);
            })
        );
    }
}
