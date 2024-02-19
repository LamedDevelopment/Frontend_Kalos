import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { AppointmentsService } from '../../services/user/appointments.service';
import { MatDialog } from '@angular/material/dialog';
import { LoungService } from '../../services/user/loung.service';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ManagerService } from '../../services/manager.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-lounge',
    templateUrl: './lounge.component.html',
    styleUrls: ['./lounge.component.scss'],
})
export class LoungeComponent implements AfterViewInit, OnInit {
    loungeSelected: boolean = false;
    Business: any[] = [];
    nameLoung: any;
    collSelected: any;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    colaboradores: any[] = [];
    Servicios: any[] = [];
    TypeServicios: any[] = [];
    businessSelected: any;
    ServiceSelected: any;
    tradename: any;

    startServiceform: FormGroup;
    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        public _loungService: LoungService,
        private _snackBar: MatSnackBar,
        private managerservice: ManagerService,
        private fb: FormBuilder
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this.startServiceform = this.fb.group({
            typeservice: [''],
            staff: ['', [Validators.required]],
            dateService: ['', [Validators.required]],
            timeService: ['', [Validators.required]],
        });
        this.getBusiness();
    }

    ngAfterViewInit() {}

    SelectLounge(el: any) {
        console.log('buss selected', el);

        this.loungeSelected = true;
        this.businessSelected = el;
        this.nameLoung = el.branchoffices[0].businessName;
        this.tradename = el.branchoffices[0].tradename;

        // this.colaboradores = el.branchoffices[0].collaborators;
        this.getServices();
    }

    ColaboratorSeledted(e: any) {
        this.collSelected = e;
        this.TypeServicios = e.typeService;
        console.log(this.collSelected);
    }

    setServicioSelected(e: any) {
        this.ServiceSelected = e;
    }

    getBusiness() {
        this._loungService.getBusiness('bus/allbus').subscribe(
            (response) => {
                this.Business = response.msg;
            },
            (response) => {
                this.showAlert = true;
            }
        );
    }

    getServices() {
        this._loungService.getServices('sv/allse').subscribe(
            (response) => {
                this.Servicios = response.msg;
            },
            (response) => {
                this.showAlert = true;
            }
        );
    }

    onServiceSelected(event: any) {
        this.ServiceSelected = event._id;
        this.startServiceform.patchValue({ staff: '' });
        this.TypeServicios = [];
    }

    getStaffCtr() {
        return this.startServiceform?.get('staff') as FormControl;
    }

    getTypeserviceCtr() {
        return this.startServiceform?.get('typeservice') as FormControl;
    }

    getdateService() {
        return this.startServiceform?.get('dateService') as FormControl;
    }

    getHourCtr() {
        return this.startServiceform?.get('timeService') as FormControl;
    }

    typeServiceSelected(event: any) {}

    collaSelected(event: any) {
        this.getTypeServices();
    }

    dateSelected(event: any) {
        this.startServiceform.patchValue({ dateService: event });
    }

    getTypeServices() {
        let body = {
            serviceID: this.ServiceSelected,
        };
        this.managerservice
            .getTypesServices('tsv/tsxserid', body)
            .subscribe((response: any) => {
                this.TypeServicios = response.msg;
            });
    }

    goBack() {
        this.loungeSelected = false;
        this.collSelected = [];
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    AgendarCita(event: any) {
        console.log('agendar cita', this.startServiceform.value);

        let dataUser = this.getDataUser();
        let body = {
            user: dataUser.id,
            discount: '',
            userForeing: {
                nomUser: '',
                apeUser: '',
                emailUser: '',
                movilUser: '',
                userDocu: '',
            },
            business: this.businessSelected._id,
            tradename: this.tradename,
            manager: '',
            observationManager: '',
            staff: this.startServiceform.get('staff')?.value,
            services: this.ServiceSelected,
            typeServices: this.startServiceform.get('typeservice')?.value,
            dateService: this.startServiceform.get('dateService')?.value,
            timeService: this.startServiceform.get('timeService')?.value,
        };

        console.log('body', body);

        this.managerservice.createAppoFora('apu', body).subscribe(
            (response: any) => {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                if (response.ok == true) {
                    this._snackBar.open(response.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                } else {
                    this._snackBar.open(response.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                }
            },
            (error) => {
                console.log(error);

                this._snackBar.open(error.error.msg, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
            }
        );
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    getDataUser() {
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        return datauser;
    }
}
