import { Injectable } from '@angular/core';
import { ApiServiceHttp } from '../api.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

constructor(
    private _apiServiceHttp: ApiServiceHttp,
) { }


/**
   * GetAppointments
   *
   */
  getAppointmentDayOrWeek(url:any): Observable<any> {
    return this._apiServiceHttp.get(url).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

  /**
   * GetAppointments
   *
   */
  getAppointmentHistory(url:any): Observable<any> {
    return this._apiServiceHttp.get(url).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

  /**
   * update appointment
   *
   * @param data
   */
  updateAppointment(data:any): Observable<any> {
    return this._apiServiceHttp.put(`apu`, data).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

  /**
   * delete appointment
   *
   * @param data
   */
  deleteAppointment(data:any): Observable<any> {
    return this._apiServiceHttp.post(`apu/canapp`, data).pipe(
      map((response: any) => {
        // Return a new observable with the response
        return response;

      }),
    );
  }

}
