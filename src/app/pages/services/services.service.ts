import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiServiceHttp } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

    Services = [
        { type: 'Peluqueria', icono:'ri-scissors-line', count: 150},
        { type: 'Infantil', icono:'ri-bear-smile-line', count: 60},
        { type: 'Spa de Uñas', icono:'ri-ink-bottle-line', count: 50},
        { type: 'Barberia', icono:'ri-coupon-5-line', count: 250},
        { type: 'Tatuajes', icono:'ri-ghost-2-line', count: 25},
    ]

    constructor(private _apiServiceHttp: ApiServiceHttp,) { }
    getData() {
    return this.Services;
  }

  InfoUserApi(){
    // console.log('ingresa función home')
    return this._apiServiceHttp.post('login/token', {}).pipe(
      map((response: any) => {
        // console.log(response)
        return response
        // Store the user on the user service
        //this._userService.user = this.token;
      },
      (error:any) =>{
        console.log(error)
      }
      ),
    );
  }
}
