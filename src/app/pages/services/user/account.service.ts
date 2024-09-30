import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ApiServiceHttp } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

constructor(
    private _apiServiceHttp: ApiServiceHttp,
) { }

/**
   * Account
   *
   * @param data
   * @param id
   */
  updateAccount(data:any, id:number): Observable<any> {
    return this._apiServiceHttp.put(`usr/${id}`, data).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return of(response);

      }),
    );
  }

  /**
   * Account
   *
   * @param data
   * @param id
   */
  updateAccountFun(data:any, url:string): Observable<any> {
    return this._apiServiceHttp.post(url, data).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return of(response);

      }),
    );
  }

  /**
   * update password
   *
   * @param data
   */
  updatePass(data:any, url:string): Observable<any> {
    return this._apiServiceHttp.post(url, data).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return of(response);

      }),
    );
  }



  /**
   * GetAccount
   *
   */
  getAccount(): Observable<any> {
    return this._apiServiceHttp.get('usr/oneusr').pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;
      }),
    );
  }

  /**
   * GetAccount Funcionario
   *
   */
  getAccountFun(): Observable<any> {
    return this._apiServiceHttp.get('bususu/onecol').pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

}
