import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { LoungService } from 'src/app/pages/services/user/loung.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-lng-services-completation',
    templateUrl: './lng-services-completation.component.html',
    styleUrls: ['./lng-services-completation.component.scss'],
})
export class LngServicesCompletationComponent implements OnInit {
    @Input() formGroup: FormGroup;
    @Input() businessID = '';
    @Input() tradename = '';
    @Input() staff = '';

    @Input() dateService: FormControl;
    @Input() hourctr: FormControl;

    @Output() dateSelected = new EventEmitter<any>();
    @Output() agendarCita = new EventEmitter<any>();
    days = [];
    constructor(
        public themeService: CustomizerSettingsService,
        public _loungService: LoungService,
        private managerservice: ManagerService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tradename']) {
            this.getDays();
        }
    }

    getDays() {
        if (this.businessID == '' || this.tradename == '') {
            return;
        }
        let body = {
            businessID: this.businessID,
            tradename: this.tradename,
        };
        this.managerservice
            .getDays('apu/busdaycal', body)
            .subscribe((response: any) => {
                this.days = response.msg.branchoffices;
            });
    }

    /** Evento que obtiene el dia seleccionado */
    public daySelected(event: any) {
        this.dateSelected.emit(event.valor);
    }

    hourSelected(event: any) {}
    AgendarCita() {
        this.agendarCita.emit(true);
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
