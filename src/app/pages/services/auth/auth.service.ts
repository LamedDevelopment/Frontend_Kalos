import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthUtils } from '../../../components/authentication/auth/auth.utils';
import { ApiServiceHttp } from '../api.service';
import { UserService } from '../user/user.service';
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
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        sessionStorage.setItem('accessToken', token);
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
        return this._apiServiceHttp.post('forpass/usr', email).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    /**
     * Forgot password student
     *
     * @param email
     */
    forgotPasswordStudent(email: string): Observable<any> {
        return this._apiServiceHttp.post(
            'authenticate_student/forgot-password',
            email
        );
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(body: string): Observable<any> {
        return this._apiServiceHttp
            .post('forpass/rpuspass', body)
            .pipe(
                switchMap((response: any) => {
                    // console.log(response)
                    // if (!response.status) {

                    // }

                    return of(response);
                })
            );
    }


    /**
     * activate user endpoint
     *
     * @param token
     */
    ActiveUser(token: string): Observable<any> {
        return this._apiServiceHttp.get(
            `emailverification/${token}`
        );
    }

    /**
     * Cancelar cita
     *
     * @param token
     */
    cancelAppointment(token: any): Observable<any> {
        return this._apiServiceHttp.post(
            'apu/emailcanapp', token
        ).pipe(
            map((response: any) => {
                return response
            })
        );;
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: {
        email: string;
        pass: string;
        rememberMe: boolean;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._apiServiceHttp.post('login', credentials).pipe(
            map((response: any) => {
                if (response.ok) {
                    // Store the access token in the local storage
                    this.accessToken = response.login;

                    // Set the authenticated flag to true
                    this._authenticated = true;
                    // Return a new observable with the response
                    return response;
                } else {
                    // Return a new observable with the response
                    return response;
                }
            })
        );
    }

    signInFun(credentials: {
        email: string;
        pass: string;
        rememberMe: boolean;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._apiServiceHttp.post('login/bx', credentials).pipe(
            map((response: any) => {
                // console.log(response);
                if (response.ok) {
                    // Store the access token in the local storage
                    this.accessToken = response.msg;

                    this.InfoBussines().subscribe();
                    // Set the authenticated flag to true
                    this._authenticated = true;
                    // Return a new observable with the response
                    return response;
                } else {
                    // Return a new observable with the response
                    return response;
                }
            })
        );
    }

    InfoUserApi(): Observable<any> {
        return this._apiServiceHttp.post('login/token', {}).pipe(
            map(
                (response: any) => {

                    if (response.msg.business) {
                        sessionStorage.setItem(
                            'dataUser',
                            JSON.stringify(response.msg.business)
                        );
                    } else {
                        sessionStorage.setItem(
                            'dataUser',
                            response.msg.user
                                ? JSON.stringify(response.msg.user)
                                : JSON.stringify(response.msg[0])
                        );
                    }

                    // Store the user on the user service
                    this._userService.user = response.msg;
                    return of(response);
                },
                (error: any) => {
                    console.log(error);
                    return of(error);
                }
            )
        );
    }

    InfoBussines(): Observable<any> {
        return this._apiServiceHttp.get('bus', {}).pipe(
            map(
                (response: any) => {
                    // console.log(response);

                    // Store the user on the user service
                    //   sessionStorage.setItem('bussines', JSON.stringify(response.msg.user));
                    return of(response);
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
    signUp(user: any): Observable<any> {
        return this._apiServiceHttp.post('usr', user).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    signUpQR(url: string, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
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
