import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../modalservice/modalservice.component';
import Swal from 'sweetalert2';
import { ManagerService } from 'src/app/pages/services/manager.service';

@Component({
    selector: 'app-closeservice',
    templateUrl: './closeservice.component.html',
    styleUrls: ['./closeservice.component.scss'],
})
export class CloseserviceComponent {
    endServiceform: FormGroup;
    businessData: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private modalservice: ModalservicesService,
        private _getAppointment: AppointmentsService,
        private managerservice: ManagerService
    ) {}

    ngOnInit(): void {
        console.log('====================================');
        console.log('get');
        console.log('====================================');
        this.businessData = this.modalservice.getBusinessData();
        this.endServiceform = this._formBuilder.group({
            observacion: [''],
            servicio: this._formBuilder.array([]),
            supplies: this._formBuilder.array([]),
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    endService() {
        console.log(this.endServiceform.value);

        const body = {
            appointmentID: this.businessData._id,
            businessID: this.businessData?.business?.business,
            serviceID: this.businessData?.services[0]._id,
            staffID:
                this.businessData?.appointmentDate[0].collaboratorAppointment
                    .staff,
            appointmentDateID: this.businessData.appointmentDate[0]._id,
            observationAppointment:
                this.endServiceform?.get('observacion')?.value,
            endAddDescriptionService:
                this.endServiceform.get('servicio')?.value,
            supplies: this.endServiceform.get('supplies')?.value,
        };
        console.log(body);

        this._getAppointment.closeService(body).subscribe(
            (response) => {
                console.log('res', response);
                if (response.ok == true) {
                    Swal.fire({
                        title: response.msg,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.closeDialog();
                        }
                    });
                }
            },
            (error) => {}
        );
    }

    agregarServicio() {
        const nuevoServicio = this._formBuilder.group({
            serviceName: [''],
            CostService: [''],
        });

        // Agregar el nuevo objeto al form array
        (this.endServiceform.get('servicio') as FormArray).push(nuevoServicio);
    }

    eliminarServicio(index: number) {
        (this.endServiceform.get('servicio') as FormArray).removeAt(index);
    }

    get servicioArray(): any {
        return this.endServiceform.get('servicio') as FormArray;
    }

    agregarSuministros() {
        const nuevosuministro = this._formBuilder.group({
            product: [''],
            brand: [''],
            reference: [''],
            description: [''],
            suppliesPrice: [''],
        });

        // Agregar el nuevo objeto al form array
        (this.endServiceform.get('supplies') as FormArray).push(
            nuevosuministro
        );
    }

    eliminarSuministro(index: number) {
        (this.endServiceform.get('supplies') as FormArray).removeAt(index);
    }

    get suministrosArray(): any {
        return this.endServiceform.get('supplies') as FormArray;
    }
}
