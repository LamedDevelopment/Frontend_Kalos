import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-selectservices',
    templateUrl: './selectservices.component.html',
    styleUrls: ['./selectservices.component.scss'],
})
export class SelectservicesComponent {
    @Input() ctr: FormControl<any>;
    @Input() Servicios: any = [];
    @Output() serviceSelected = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    onServiceChange(event: any) {
        console.log(this.ctr.value);
        this.serviceSelected.emit({
            propiedad: 'service_selected',
            valor: this.ctr.value,
        });
    }
}
