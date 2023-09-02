import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {

    Data = [
        {
            tipo: 'Peluqueria',
            name: 'Servicio 1',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria',
        },
        {
            tipo: 'Spa de Uñas',
            name: 'Servicio 2',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Spa de Uñas',
        },
        {
            tipo: 'Peluqueria',
            name: 'Servicio 3',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria',
        },
        {
            tipo: 'Spa de Uñas',
            name: 'Servicio 4',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Spa de Uñas',
        },
        {
            tipo: 'Peluqueria Infantil',
            name: 'Servicio 5',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria Infantil',
        },
        {
            tipo: 'Peluqueria Infantil',
            name: 'Servicio 6',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria Infantil',
        },
        {
            tipo: 'Peluqueria',
            name: 'Servicio 7',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria',
        },
        {
            tipo: 'Spa de Uñas',
            name: 'Servicio 8',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Spa de Uñas',
        },
        {
            tipo: 'Peluqueria',
            name: 'Servicio 9',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria',
        },
        {
            tipo: 'Spa de Uñas',
            name: 'Servicio 10',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Spa de Uñas',
        },
        {
            tipo: 'Peluqueria Infantil',
            name: 'Servicio 11',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria Infantil',
        },
        {
            tipo: 'Peluqueria Infantil',
            name: 'Servicio 12',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central Peluqueria Infantil',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 5',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 6',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 7',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 8',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 9',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 10',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 11',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        },
        {
            tipo: 'Barberia',
            name: 'Servicio 12',
            calificacion: 4.5,
            reviews: 40,
            description: 'Peluquería y barbería central',
        }
    ]



    constructor() { }

    getData() {
    return this.Data;
  }
}
