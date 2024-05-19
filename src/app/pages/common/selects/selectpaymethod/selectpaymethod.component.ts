import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ManagerService } from 'src/app/pages/services/manager.service';

@Component({
    selector: 'app-selectpaymethod',
    templateUrl: './selectpaymethod.component.html',
    styleUrls: ['./selectpaymethod.component.scss'],
})
export class SelectpaymethodComponent {
    data: any = [];
    @Output() methodSelected = new EventEmitter<any>();
    optionselected = '';
    valueInput: any;
    constructor(private managerservice: ManagerService) {
        this.getColla();
    }

    getColla() {
        this.managerservice.getPaymentsMethods().subscribe((response: any) => {
            this.data = response.msg;
        });
    }

    onCollaChange(event: any) {
        this.valueInput = this.methodSelected.emit({
            propiedad: 'metodo_selected',
            valor: this.valueInput,
        });
    }
}
