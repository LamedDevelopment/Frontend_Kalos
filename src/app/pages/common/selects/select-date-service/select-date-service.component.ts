import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-select-date-service',
    templateUrl: './select-date-service.component.html',
    styleUrls: ['./select-date-service.component.scss'],
})
export class SelectDateServiceComponent {
    @Input() days: any[] = [];
    ctr = new FormControl(null);
    @Output() dateSelected = new EventEmitter<any>();

    daysAvailable: any[];
    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['days']) {
            this.daysAvailable = this.days[0]?.serviceday?.map((day: any) => {
                console.log(this.days);

                return parseInt(day.dayNumber, 10);
            });
        }
    }

    ngOnInit(): void { }

    myFilter = (d: Date | null): boolean => {
        if (!d) {
            return false;
        }

        const day = d.getDay(); // getDay() devuelve el día de la semana (0 = Domingo, 1 = Lunes, etc.)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00.000

        // Mapeo de los días de la semana a sus nombres y números correspondientes en tu filtro
        const dayMap: { [key: number]: string } = {
            0: '7', // Domingo
            1: '1', // Lunes
            2: '2', // Martes
            3: '3', // Miércoles
            4: '4', // Jueves
            5: '5', // Viernes
            6: '6', // Sábado
        };

        // Obtener el número del día correspondiente
        const dayNumber = dayMap[day];
        // Verificar si el día está en los días disponibles
        const daysAvailable = this.days[0];
        const dayAvailable = daysAvailable.serviceday.some(
            (serviceDay: any) => serviceDay.dayNumber === dayNumber
        );
        // Comparar las fechas sin tener en cuenta la hora
        const isFutureOrToday = d.setHours(0, 0, 0, 0) >= today.getTime();
        return dayAvailable && isFutureOrToday;
    };

    onDateChange() {
        const momentObject = moment(this.ctr.value).format('DD/MM/YYYY');
        this.dateSelected.emit({
            propiedad: 'date_selected',
            valor: momentObject,
        });
    }
}
