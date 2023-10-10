import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { AuthUtils } from '../../../components/authentication/auth/auth.utils';
import { Router } from '@angular/router';
import { ApiServiceHttp } from '../api.service';
import { UserService } from '../user/user.service';
import jwt_decode from 'jwt-decode';
@Injectable()
export class AuthService {
  private _authenticated: boolean = false;
  token: any;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
    private _apiServiceHttp: ApiServiceHttp,
    private _router: Router,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    sessionStorage.setItem('accessToken', token);
    console.log(token)
  }

  get accessToken(): string {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._apiServiceHttp.post('authenticate/forgot-password', email).pipe(
      switchMap((response: any) => {
        if (!response.status) {
          return this.forgotPasswordStudent(email);
        }
        return of(response);
      }),
    );
  }

  /**
   * Forgot password student
   *
   * @param email
   */
  forgotPasswordStudent(email: string): Observable<any> {
    return this._apiServiceHttp.post('authenticate_student/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._apiServiceHttp.post('authenticate/reset-password', password).pipe(
      switchMap((response: any) => {
        if (!response.status) {
          return this.resetPasswordStudent(password);
        }

        return of(response);
      }),
    );
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPasswordStudent(password: string): Observable<any> {
    return this._apiServiceHttp.post('authenticate_student/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; pass: string; rememberMe: boolean }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._apiServiceHttp.post('login', credentials).pipe(
      map((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.login;

        // Set the authenticated flag to true
        this._authenticated = true;



        // Return a new observable with the response
        return of(response);
        /* if(this.token.login_first === 1){
           if (credentials.rememberMe) {
              localStorage.setItem('dataAuth', JSON.stringify(this.token));
            }

            sessionStorage.setItem('dataAuth', JSON.stringify(this.token));

            // Set the authenticated flag to true
            this._authenticated = true;

            // Store the user on the user service
            this._userService.user = this.token;

            // Return a new observable with the response
            return of(response);
        } else {
            this._router.navigateByUrl('/forgot-password');
        } */

      }),
    );
  }

  InfoUserApi(): Observable<any> {
    return this._apiServiceHttp.post('login/token', {}).pipe(
          map((response: any) => {
              console.log(response);
              return of(response);
              // Store the user on the user service
              //this._userService.user = this.token;
          },
              (error: any) => {
                  console.log(error);
                  return of(error);
              }
          )
      );
  }
  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Renew token

    // Store the access token in the local storage
    this.accessToken = this.accessToken;

    // Set the authenticated flag to true
    this._authenticated = true;

    // Store the user on the user service
    //this._userService.user = response.user;

    // Return true
    return of(true);
    /* return this._httpClient.post('auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        ); */
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('dataAuth');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    if (this.accessToken && !AuthUtils.isTokenExpired(this.accessToken)) {
      return of(true);
    } else {
      return of(false);
    }
  }
}
