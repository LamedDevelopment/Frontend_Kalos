import { Component, EventEmitter, Output } from '@angular/core';
import { ManagerService } from 'src/app/pages/services/manager.service';

@Component({
    selector: 'app-select-permisos',
    templateUrl: './select-permisos.component.html',
    styleUrls: ['./select-permisos.component.scss'],
})
export class SelectPermisosComponent {
    data: any = [
        { id: 1, name: 'Permiso 1 Hora' },
        { id: 2, name: 'Permiso 6 Horas' },
        { id: 3, name: 'Permiso 12 Horas' },
    ];
    @Output() turnosSelected = new EventEmitter<any>();
    optionselected = '';
    valueInput: any;
    constructor(private managerservice: ManagerService) {
        // this.getTurnos();
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
