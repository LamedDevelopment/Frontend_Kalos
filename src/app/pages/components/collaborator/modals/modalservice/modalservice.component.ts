import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators } from 'ngx-editor';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import Swal from 'sweetalert2';
import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBar,
} from '@angular/material/snack-bar';
@Component({
    selector: 'app-modalservice',
    templateUrl: './modalservice.component.html',
    styleUrls: ['./modalservice.component.scss'],
})
export class ModalserviceComponent {
    startServiceform: FormGroup;
    businessData: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private modalservice: ModalservicesService,
        private _getAppointment: AppointmentsService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        this.businessData = this.modalservice.getBusinessData();
        console.log('data en el modal', this.businessData);

        this.startServiceform = this._formBuilder.group({
            observacion: [''],
            servicio: this._formBuilder.array([]),
            supplies: this._formBuilder.array([]),
        });
    }

    startService() {
        const body = {
            appointmentID: this.businessData._id,
            businessID: this.businessData?.business?.business,
            serviceID: this.businessData?.services[0]._id,
            staffID:
                this.businessData?.appointmentDate[0].collaboratorAppointment
                    .staff,
            appointmentDateID: this.businessData.appointmentDate[0]._id,
            observationAppointment:
                this.startServiceform?.get('observacion')?.value,
            startAddDescriptionService:
                this.startServiceform.get('servicio')?.value,
            supplies: this.startServiceform.get('supplies')?.value,
        };
        console.log(body);

        this._getAppointment.startService(body).subscribe(
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
            (error) => {
                console.log(error);
                this._snackBar.open(
                    error.error?.msg
                        ? error.error.msg
                        : 'Error al finalizar Servicio',
                    '',
                    {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    }
                );
            }
        );
    }

    closeDialog() {
        this.dialogRef.close();
    }

    agregarServicio() {
        const nuevoServicio = this._formBuilder.group({
            serviceName: [''],
            CostService: [''],
        });

        // Agregar el nuevo objeto al form array
        (this.startServiceform.get('servicio') as FormArray).push(
            nuevoServicio
        );
    }

    eliminarServicio(index: number) {
        (this.startServiceform.get('servicio') as FormArray).removeAt(index);
    }

    get servicioArray(): any {
        return this.startServiceform.get('servicio') as FormArray;
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
        (this.startServiceform.get('supplies') as FormArray).push(
            nuevosuministro
        );
    }

    eliminarSuministro(index: number) {
        (this.startServiceform.get('supplies') as FormArray).removeAt(index);
    }

    get suministrosArray(): any {
        return this.startServiceform.get('supplies') as FormArray;
    }
}
