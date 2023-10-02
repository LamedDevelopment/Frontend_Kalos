import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceHttp {
  toogleSide = false;
  constructor(private http: HttpClient) {}

  post(path: string, data: any): Observable<any>{
    return this.http.post<any>(`${environment.url_api}${path}`, data, ).pipe(map((d) => d, (err:any) => console.log(err)));
  }

  public get(
    path: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): any {
    return this.http.get<any>(`${environment.url_api}${path}`).pipe(map((d) => d));
  }

  getParams(path: string, params: any): any {

    return this.http.get<any>(`${environment.url_api}${path}`, { params: params }).pipe(map((d) => d));
  }

  delete(path: string): any {
    return this.http.delete<any>(`${environment.url_api}${path}`).pipe(map((d) => d));
  }

  put(path: string, data: any): any {
    return this.http.put<any>(`${environment.url_api}${path}`, data).pipe(map((d) => d));
  }

  getExtern(path: string): any {
    return this.http.get<any>(`${path}`).pipe(map((d) => d));
  }
}
