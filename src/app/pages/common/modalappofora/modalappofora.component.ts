import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../components/collaborator/modals/modalservice/modalservice.component';
import { ManagerService } from '../../services/manager.service';
import { jwtDecode } from 'jwt-decode';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SwalServiceService } from '../../services/swal-service.service';

@Component({
    selector: 'app-modalappofora',
    templateUrl: './modalappofora.component.html',
    styleUrls: ['./modalappofora.component.scss'],
})
export class ModalappoforaComponent {
    branchoffices = []; // sedes, para ser enviadas al componente del select
    servicesManager = [];
    days = [];
    startServiceform: FormGroup;
    typeServices: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private fb: FormBuilder,
        private managerservice: ManagerService,
        private _snackBar: MatSnackBar,
        private swalservice: SwalServiceService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.branchoffices = data.branchoffices;
        this.startServiceform = data.formGroup;
    }

    ngOnInit(): void {
        this.startServiceform = this.fb.group({
            nomUser: ['', [Validators.required]],
            apeUser: ['', [Validators.required]],
            emailUser: [''],
            movilUser: [''],
            userDocu: [''],
            businessName: ['', [Validators.required]],
            business: ['', [Validators.required]],
            services: ['', [Validators.required]],
            typeServices: ['', [Validators.required]],
            staff: ['', [Validators.required]],
            dateService: ['', [Validators.required]],
            timeService: ['', [Validators.required]],
            observationManager: [''],
            manager: ['', [Validators.required]],
        });

        this.getDataManager();
    }

    getBussinesNameCtr() {
        return this.startServiceform.get('businessName') as FormControl;
    }

    getServicesCtr() {
        return this.startServiceform.get('services') as FormControl;
    }

    getTypeServicesCtr() {
        return this.startServiceform.get('typeServices') as FormControl;
    }

    getStaffCtr() {
        return this.startServiceform.get('staff') as FormControl;
    }

    getTimeService() {
        return this.startServiceform.get('timeService') as FormControl;
    }

    /** Evento que obtiene la sede seleccionada */
    businessSelected(event: any) {
        console.log(this.startServiceform.value);
        this.startServiceform.patchValue({ business: this.data._id });
        this.getServices(); // traer servicios
        this.getDays(); // traer dias disponibles de acuerdo a la sede
    }

    /** Evento que obtiene el servicio seleccionado */
    serviceSelected(event: any) {
        this.startServiceform.patchValue({ services: event.valor.services });
        this.getTypeServices();
    }

    /** Evento que obtiene el tipo servicio seleccionado */
    typeServiceSelected(event: any) {}

    /** Evento que obtiene el colaborador seleccionado */
    collaSelected(event: any) {
        // TODO Agregar la Imagen del Colabroador GERSON SAENZ
        this.startServiceform.patchValue({
            staff: event.valor.branchoffices.collaborators.user,
        });
    }

    /** Evento que obtiene el dia seleccionado */
    public daySelected(event: any) {
        this.startServiceform.patchValue({ dateService: event.valor });
    }

    /** Evento que obtiene el colaborador seleccionado */
    hourSelected(event: any) {}

    getServices() {
        let dataUser = this.getDataUser();
        let body = {
            nit: dataUser.nit,
            tradename: this.startServiceform.get('businessName')?.value,
        };
        this.managerservice
            .getServices('bus/viewsebu', body)
            .subscribe((response: any) => {
                this.servicesManager = response.msg.branchoffices[0].services;
            });
    }

    getTypeServices() {
        let body = {
            business: this.startServiceform.get('business')?.value,
            serviceID: this.startServiceform.get('services')?.value,
        };
        this.managerservice
            .getTypesServices('tsv/tsxserid', body)
            .subscribe((response: any) => {
                this.typeServices = response.msg;
            });
    }

    getDataUser() {
        return JSON.parse(sessionStorage.getItem('dataUser')!);
    }

    getDays() {
        let body = {
            businessID: this.startServiceform.get('business')?.value,
            tradename: this.startServiceform.get('businessName')?.value,
        };
        this.managerservice
            .getDays('apu/busdaycal', body)
            .subscribe((response: any) => {
                this.days = response.msg.branchoffices;
            });
    }

    createService() {
        const loading = this.swalservice.getLoading();
        let body = {
            user: '',
            discount: '',
            userForeing: {
                nomUser: this.startServiceform.get('nomUser')?.value,
                apeUser: this.startServiceform.get('apeUser')?.value,
                emailUser: this.startServiceform.get('emailUser')?.value,
                movilUser: this.startServiceform.get('movilUser')?.value,
                userDocu: this.startServiceform.get('userDocu')?.value,
            },
            business: this.startServiceform.get('business')?.value,
            tradename: this.startServiceform.get('businessName')?.value,
            manager: this.startServiceform.get('manager')?.value,
            observationManager:
                this.startServiceform.get('observationManager')?.value,
            staff: this.startServiceform.get('staff')?.value,
            services: this.startServiceform.get('services')?.value,
            typeServices: this.startServiceform.get('typeServices')?.value,
            dateService: this.startServiceform.get('dateService')?.value,
            timeService: this.startServiceform.get('timeService')?.value,
        };

        this.managerservice.createAppoFora('apu', body).subscribe(
            (response: any) => {
                loading.close();
                if (response.ok == true) {
                    this._snackBar.open(response.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.closeDialog();
                } else {
                    loading.close();
                    this._snackBar.open(response.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                }
            },
            (error) => {
                loading.close();
                console.log(error);
                this._snackBar.open(error.error.msg, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
            }
        );
    }

    closeDialog() {
        this.dialogRef.close();
    }

    getDataManager() {
        let token: any = sessionStorage.getItem('accessToken');

        if (token) {
            const decoded: any = jwtDecode(token);
            console.log('decod', decoded);
            this.startServiceform.patchValue({ manager: decoded.uid });
        }
    }
}
