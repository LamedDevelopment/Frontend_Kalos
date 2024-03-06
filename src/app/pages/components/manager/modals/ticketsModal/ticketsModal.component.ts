import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../../collaborator/modals/modalservice/modalservice.component';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-ticketsModal',
    templateUrl: './ticketsModal.component.html',
    styleUrls: ['./ticketsModal.component.scss'],
})
export class ticketsModalComponent {
    preFactura: FormGroup;
    businessData: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });
    dataFactura: any;
    PayBill: any;
    selectSolicitudes = [
        { id: 1, name: 'Autorizado' },
        { id: 1, name: 'Negado' },
        { id: 1, name: 'Desembolsado' },
        { id: 1, name: 'Cancelado' },
    ];

    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private modalservice: ModalservicesService,
        private appointmentsService: AppointmentsService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.dataFactura = data;
    }

    ngOnInit(): void {
        console.log(this.dataFactura);
        this.businessData = this.modalservice.getBusinessData();
        this.preFactura = this._formBuilder.group({
            loadID: [''],
            loanAmount: [''],
            paymentDeadline: [''],
            loanStatus: ['', Validators.required],
            paymentObservation: [''],
        });
        if (this.dataFactura) {
            this.preFactura.controls['loanAmount'].setValue(
                this.dataFactura.loanAmount
            );
            this.preFactura.controls['loadID'].setValue(this.dataFactura._id);
            this.preFactura.controls['paymentDeadline'].setValue(
                this.dataFactura.paymentDeadline
            );
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }

    ProcessSol() {
        const valueBody = this.preFactura.getRawValue();
        console.log(valueBody);
        this.appointmentsService
            .processPayBillingMan('lose/prolo', valueBody)
            .subscribe((bill: any) => {
                if (bill.ok) {
                    this._snackBar.open(
                        'Solicitud procesada exitosamente!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                    this.dialogRef.close();
                } else {
                    this._snackBar.open(
                        'Error al procesar la solicitud!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                }
            });
    }
}
