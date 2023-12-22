import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalservicesService {
    private data: any;
    constructor() {}

    setBusinessData(data: any) {
        this.data = data;
    }

    getBusinessData() {
        return this.data;
    }
}
