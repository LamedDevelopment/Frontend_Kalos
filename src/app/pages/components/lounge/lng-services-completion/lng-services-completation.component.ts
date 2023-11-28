import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { LoungService } from 'src/app/pages/services/user/loung.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-lng-services-completation',
  templateUrl: './lng-services-completation.component.html',
  styleUrls: ['./lng-services-completation.component.scss']
})
export class LngServicesCompletationComponent implements  OnInit {
    @Input()
    colaborador:any;

    @Input()
    Business:any;

    @Input()
    TypeServices:any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    Hours = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
    servicios = ['Peluqueria', 'Tinte', 'Uñas', 'Alisado']
    horarioSelected:string = '';
    DateSelected:string = '';
    appoimentAdd:Array<any> = [];
    ServiceSelected: any;
    user: any;
    constructor(
        public themeService: CustomizerSettingsService,
        public _loungService: LoungService,
        private _userService: UserService,
        private _getAppointment: AppointmentsService,
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: any) => {
                this.user = user.user;
                console.log(this.user)
            });
            this.getAppoinment();
        console.log(this.Business, this.colaborador)
    }


    SelectedHour(hour:string){
        this.horarioSelected = hour;
        console.log(this.horarioSelected)
    }

    SelectedServ(serv:string){
        this.ServiceSelected = serv;
        console.log(this.ServiceSelected)
    }



    getAppoinment(){
        this._getAppointment.getAppointmentDayOrWeek('apu/wuap').subscribe((appo:any) => {
            console.log(appo)
        });
    }
    getHours(){
        const body = {
            business:this.Business._id,
            tradename:this.Business.branchoffices[0].tradename,
            staff:this.colaborador.user,
            dateService:moment(this.DateSelected).format('DD/MM/YYYY')
        };
        this._loungService.getHours('apu/horact', body).subscribe(
                (response) => {
                    console.log(response);
                    this.Hours = response.msg
                },
                (response) => {
                }
            );
    }

    valueChanged(e:any){
        this.getHours();
    }

    AgendarCita(){
        console.log(this.colaborador)
        this.appoimentAdd.push({
            id: Math.random(),
            name:this.colaborador.name,
            lastname: this.colaborador.lastname,
            date: moment(this.DateSelected).format('DD/MM/YYYY'),
            hour: this.horarioSelected,
            Service: this.ServiceSelected
        });
    const body =
        {
            user: this.user.id,
            discount: "",
            business: this.Business._id,
            tradename: this.Business.branchoffices[0].tradename,
            manager: "",
            observationManager: "",
            staff: this.colaborador.user,
            services: this.ServiceSelected.typeServices,
            typeServices: this.ServiceSelected.typeServices,
            dateService: moment(this.DateSelected).format('DD/MM/YYYY'),
            timeService: this.horarioSelected
        }

        this._loungService.createAppoinment('apu', body).subscribe(
                (response) => {
                    console.log(response);
                },
                (response) => {
                }
            );
    }

    disabledButton(){
        return this.horarioSelected == '' || this.ServiceSelected == '' || this.DateSelected == ''
    }

    myFilter = (d: Date | null): boolean => {
        const actDate = new Date();
        const day = (d || new Date());
        // const day = (d || new Date()).getDay();
        // Prevent Saturday and Sunday from being selected.
        // day !== 0 && day !== 6 &&
        return day >= actDate;
    };

    DeleteService(el:any){
        this.appoimentAdd = this.appoimentAdd.filter((item:any) => item.id !== el.id)
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
