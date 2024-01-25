import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../../collaborator/modals/modalservice/modalservice.component';
import Swal from 'sweetalert2';
import { MatStepper, MatStepperIntl } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
    selector: 'app-paymentsModal',
    templateUrl: './paymentsModal.component.html',
    styleUrls: ['./paymentsModal.component.scss'],
})
export class PaymentsModalComponent {
    @ViewChild(MatStepper) stepper!: MatStepper;
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


    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private modalservice: ModalservicesService,
        private appointmentsService: AppointmentsService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data:any,
    ) {
        this.dataFactura =  data
    }

    ngOnInit(): void {
        console.log(this.dataFactura)
        this.businessData = this.modalservice.getBusinessData();
        this.preFactura = this._formBuilder.group({
            appointmentID: [''],
            docuUser: ['', Validators.required],
            managerDiscount: [0],
            tax: [0],
            paymentMethod: [
                {
                    PaymentType: "Efectivo",
                    walletPayment: {
                        nameWallet: "",
                        codRefPay: ""
                    }
                }
            ],
            electronicBilling: [true],
            observationBilling: ['']
        });

    }

    closeDialog() {
        this.dialogRef.close();
    }



    createPreBillingMan(stepper:MatStepper) {

        const valueBody =this.preFactura.getRawValue();
        valueBody.appointmentID = this.dataFactura._id
        valueBody.tax = [{"description": "IVA", "value": valueBody.tax}]

        this.appointmentsService
            .processPayBillingMan('bill', valueBody)
            .subscribe((bill: any) => {
                this.PayBill = bill.msg;
                stepper.next()
            });
    }

    RealizarPagoBill(){
        console.log(this.PayBill)
        this.appointmentsService
            .processPayBillingMan('bill/pay', this.PayBill)
            .subscribe((bill: any) => {
                if(bill.ok) {
                    this._snackBar.open('Factura registrada exitosamente!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.dialogRef.close();
                } else {
                    this._snackBar.open('Error al registrar la factura!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                }
            });
    }

}
