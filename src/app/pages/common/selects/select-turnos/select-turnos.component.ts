import { Component, EventEmitter, Output } from '@angular/core';
import { ManagerService } from 'src/app/pages/services/manager.service';

@Component({
    selector: 'app-select-turnos',
    templateUrl: './select-turnos.component.html',
    styleUrls: ['./select-turnos.component.scss'],
})
export class SelectTurnosComponent {
    data: any = [];
    @Output() turnosSelected = new EventEmitter<any>();
    optionselected = '';
    valueInput: any;
    constructor(private managerservice: ManagerService) {
        this.getTurnos();
    }

    getTurnos() {
        this.managerservice.getTurnos().subscribe((response: any) => {
            this.data = response.msg[0].daysServices;
        });
    }

    onServiceChange(event: any) {
        this.valueInput = this.turnosSelected.emit({
            propiedad: 'turnos_selected',
            valor: this.valueInput,
        });
    }
}
