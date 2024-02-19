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
    selector: 'app-select-hours-service',
    templateUrl: './select-hours-service.component.html',
    styleUrls: ['./select-hours-service.component.scss'],
})
export class SelectHoursServiceComponent {
    @Input() ctr: FormControl<any>;
    hours: any = [];
    @Input() user: any = '';
    @Input() business: any = '';
    @Input() tradename: any = '';
    @Input() staff: any = '';
    @Input() dateService: any = '';
    @Output() hourSelected = new EventEmitter<any>();

    constructor(private managerservice: ManagerService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dateService']) {
            this.getHour();
        }
    }

    getHour() {
        if (
            this.business == '' ||
            this.tradename == '' ||
            this.staff == '' ||
            this.dateService == ''
        ) {
            return;
        }

        let body = {
            user: this.user,
            business: this.business,
            tradename: this.tradename,
            staff: this.staff,
            dateService: this.dateService,
        };
        this.managerservice
            .getHours('apu/horact', body)
            .subscribe((response: any) => {
                console.log('horas', response.msg.branchoffices);
                this.hours = response.msg;
            });
    }

    onHourChange() {
        console.log('hora seleccionada', this.ctr.value);

        this.hourSelected.emit({
            propiedad: 'hour_selected',
            valor: this.ctr.value,
        });
    }
}
