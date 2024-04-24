import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-selectservices',
    templateUrl: './selectservices.component.html',
    styleUrls: ['./selectservices.component.scss'],
})
export class SelectservicesComponent {
    @Input() ctr: FormControl<any>;
    @Input() Servicios: any = [];
    @Output() serviceSelected = new EventEmitter<any>();
    valueInput:any;
    constructor() {}

    ngOnInit(): void {
    }

    onServiceChange(event: MatSelectChange ) {
        this.serviceSelected.emit({
            propiedad: 'service_selected',
            valor: this.ctr.value,
        });
         this.valueInput = this.ctr.value;
    }
}
