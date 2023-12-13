import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiServiceHttp } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LoungService {

constructor(
    private _apiServiceHttp: ApiServiceHttp,
) { }

/**
   * Post Bussiness
   *@url
   *@data
   */
  getHours(url:any, data:any): Observable<any> {
    const body = JSON.stringify(data);

    return this._apiServiceHttp.post(url, JSON.parse(body)).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

  /**
   * crate appoinment
   *@url
   *@data
   */
  createAppoinment(url:any, data:any): Observable<any> {

    return this._apiServiceHttp.post(url, data).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

  /**
   * crate Services appoinment
   *@url
   *@data
   */
  createServiceAppoinment(url:any, data:any): Observable<any> {

    return this._apiServiceHttp.post(url, data).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

 /**
   * Get Bussiness
   *@url
   */
  getBusiness(url:any): Observable<any> {
    return this._apiServiceHttp.get(url).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

  /**
   * Get Services
   *@url
   */
  getServices(url:any): Observable<any> {
    return this._apiServiceHttp.get(url).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

}
