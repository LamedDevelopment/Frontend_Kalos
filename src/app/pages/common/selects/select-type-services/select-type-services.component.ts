import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-select-type-services',
    templateUrl: './select-type-services.component.html',
    styleUrls: ['./select-type-services.component.scss'],
})
export class SelectTypeServicesComponent {
    @Input() ctr: FormControl<any>;
    @Input() typeServices: any = [];
    @Output() typeServiceSelected = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    onTypeServiceChange() {
        this.typeServiceSelected.emit({
            propiedad: 'typeService_selected',
            valor: this.ctr.value,
        });
    }
}
