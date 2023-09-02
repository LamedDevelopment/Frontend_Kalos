import { Injectable } from '@angular/core';

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

    constructor() { }
    getData() {
    return this.Services;
  }
}
