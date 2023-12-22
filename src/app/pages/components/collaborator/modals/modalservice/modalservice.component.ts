import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators } from 'ngx-editor';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';

@Component({
    selector: 'app-modalservice',
    templateUrl: './modalservice.component.html',
    styleUrls: ['./modalservice.component.scss'],
})
export class ModalserviceComponent {
    startServiceform: FormGroup;
    businessData: any;
    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private modalservice: ModalservicesService,
        private _getAppointment: AppointmentsService
    ) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        this.businessData = this.modalservice.getBusinessData();
        console.log('data en el modal', this.businessData);

        this.startServiceform = this._formBuilder.group({
            observacion: [''],
            servicio: this._formBuilder.array([]),
        });
    }

    startService() {
        console.log(this.startServiceform.value);

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
            startAddDescriptionService: [
                {
                    serviceName: 'Se agrega Servicio Al finalizar el Servicio',
                    CostService: '95000',
                },
            ],
        };
        console.log(body);

        /* this._getAppointment.startService(body).subscribe(
            (response) => {},
            (error) => {}
        ); */
    }

    closeDialog() {
        // Realiza cualquier acción necesaria antes de cerrar el diálogo
        // ...

        // Cierra el diálogo y emite el evento onClose
        this.dialogRef.close();
    }

    agregarServicio() {
        const nuevoServicio = this._formBuilder.group({
            valor1: [''],
            valor2: [''],
        });

        // Agregar el nuevo objeto al form array
        (this.startServiceform.get('servicio') as FormArray).push(
            nuevoServicio
        );
    }

    eliminarServicio(index: number) {
        (this.startServiceform.get('servicio') as FormArray).removeAt(index);
    }

    get servicioArray(): FormArray | null {
        return this.startServiceform.get('servicio') as FormArray;
    }
}
