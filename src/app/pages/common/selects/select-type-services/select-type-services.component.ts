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
    valueInput: any;
    constructor() {}

    ngOnInit(): void {}

    onTypeServiceChange() {
        console.log(this.valueInput);
        this.ctr.setValue(this.valueInput._id);
        this.typeServiceSelected.emit({
            propiedad: 'typeService_selected',
            valor: this.valueInput,
        });
        // this.valueInput = this.ctr.value;
    }
}
