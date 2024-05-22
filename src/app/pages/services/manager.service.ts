import { Injectable } from '@angular/core';
import { ApiServiceHttp } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ManagerService {
    constructor(private _apiServiceHttp: ApiServiceHttp) {}

    getBusiness(): Observable<any> {
        return this._apiServiceHttp.get('bus/manbus').pipe(
            map((response: any) => {
                return response;
            })
        );
    }
    getDays(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getHours(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    generalPostApiFiles(url: any, data: FormData): Observable<any> {
        return this._apiServiceHttp.postFiles(url, data).pipe(
            map((response: any) => {
                console.log(response)
                return response;
            })
        );
    }

    getBuss(): Observable<any> {
        return this._apiServiceHttp.get('doc').pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getServices(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getTypesServices(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getCollaborators(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    createAppoFora(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getpayloans(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    preRoll(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getQR(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    sendEmail(url: any, data: any): Observable<any> {
        return this._apiServiceHttp.post(url, data).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getProducts(): Observable<any> {
        return this._apiServiceHttp.get('bp').pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getPaymentsMethods(): Observable<any> {
        return this._apiServiceHttp.get('bill/allpatmeth').pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getNameDocuments(): Observable<any> {
        return this._apiServiceHttp.get('bus/viewdocuall').pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getBrand(body: any): Observable<any> {
        return this._apiServiceHttp.post('bp/consbrand', body).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getReference(body: any): Observable<any> {
        return this._apiServiceHttp.post('bp/consref', body).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    getSalesofDay(): Observable<any> {
        return this._apiServiceHttp.get('bill/checkout').pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    createEgreso(body: any): Observable<any> {
        return this._apiServiceHttp.post('outf/outflow', body).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
}
