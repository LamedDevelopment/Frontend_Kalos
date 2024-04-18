import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/src/sweetalert2.js';
@Injectable({
    providedIn: 'root',
})
export class SwalServiceService {
    constructor() {}

    getLoading(msg: string = 'Cargando Información...') {
        const loadingAlert: any = Swal.fire({
            title: msg,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        return loadingAlert;
    }
}
