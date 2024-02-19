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

    daysAvailable: number[];
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['days']) {
            this.daysAvailable = this.days[0]?.serviceday?.map((day: any) => {
                return parseInt(day.dayNumber, 10);
            });
        }
    }

    ngOnInit(): void {}

    myFilter = (d: Date | null): boolean => {
        const day = (d ?? new Date()).getDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00.000
        if (d) {
            return (
                this.daysAvailable?.includes(day) &&
                d.setHours(0, 0, 0, 0) >= today.getTime()
            );
        }
        return false;
    };

    onDateChange() {
        const momentObject = moment(this.ctr.value).format('DD/MM/YYYY');
        this.dateSelected.emit({
            propiedad: 'date_selected',
            valor: momentObject,
        });
    }
}
