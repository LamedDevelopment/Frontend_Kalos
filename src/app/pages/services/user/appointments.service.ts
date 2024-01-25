import { Injectable } from '@angular/core';
import { ApiServiceHttp } from '../api.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsService {
    constructor(private _apiServiceHttp: ApiServiceHttp) {}

    /**
     * GetAppointments
     *
     */
    getAppointmentDayOrWeek(url: any): Observable<any> {
        return this._apiServiceHttp.get(url).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * GetAppointments
     *
     */
    getAppointmentDayOrWeekFun(url: any): Observable<any> {
        return this._apiServiceHttp.get(url).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * GetAppointments
     *
     */
    getAppointmentHistory(url: any): Observable<any> {
        return this._apiServiceHttp.get(url).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * GetAppointments hours
     *
     */
    gethoursCollaborator(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * GetAppointments hours
     *
     */
    getCollaborator(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * GetType services
     *
     */
    getTypeServices(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * Get clients
     *
     */
    getClients(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * Get Collaborators
     *@url
     */
    getData(url: any): Observable<any> {
        return this._apiServiceHttp.get(url).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * update appointment
     *
     * @param data
     */
    updateAppointment(data: any): Observable<any> {
        return this._apiServiceHttp.put(`apu`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * start or stop appointment
     *
     * @param data
     */
    StartStopAppointmentFun(url: string, data: any): Observable<any> {
        return this._apiServiceHttp.put(url, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * update appointment fun
     *
     * @param data
     */
    updateAppointmentFun(data: any): Observable<any> {
        return this._apiServiceHttp.post(`apu/addser`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * create pre billing
     * @param url
     * @param data
     */
    processPayBillingMan(url:any , data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * create appointment fun
     *
     * @param data
     */
    CreateAppointmentFun(data: any): Observable<any> {
        return this._apiServiceHttp.post(`apu`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * delete Service
     *
     * @param data
     */
    deleteAppointment(data: any): Observable<any> {
        return this._apiServiceHttp.delete(`apu/oneser`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * Get Wallet
     *
     */
    getWallet(url: any): Observable<any> {
        return this._apiServiceHttp.get(url).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * delete cita
     *
     * @param data
     */
    deleteCompleteAppointment(data: any): Observable<any> {
        return this._apiServiceHttp.post(`apu/canapp`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    startService(data: any): Observable<any> {
        return this._apiServiceHttp.put(`apu/iniser`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    closeService(data: any): Observable<any> {
        return this._apiServiceHttp.put(`apu/finser`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    /**
     * delete appointment fun
     *
     * @param data
     */
    deleteAppointmentFun(data: any): Observable<any> {
        return this._apiServiceHttp.post(`apu/onestf`, data).pipe(
            map((response: any) => {
                // Return a new observable with the response
                return response;
            })
        );
    }

    getService(): Observable<any> {
        return this._apiServiceHttp.get(`lose/vwcolla`).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    /**
     * The `loadService` function sends a POST request to the `lose/solcolla` endpoint with the
     * provided data and returns an Observable that emits the response.
     * @param {any} data - The `data` parameter is of type `any`, which means it can accept any type of
     * data.
     * @returns The `loadService` function is returning an Observable of type `any`.
     */
    loadService(data: any): Observable<any> {
        return this._apiServiceHttp.post(`lose/solcolla`, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
}
