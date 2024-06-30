import { Component, Inject, ViewChild } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormArray,
    Validators,
    FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../../collaborator/modals/modalservice/modalservice.component';
import Swal from 'sweetalert2';
import { MatStepper, MatStepperIntl } from '@angular/material/stepper';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { select } from 'src/app/pages/common/Interfaces/select.interface';

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

    showCheckNombre = true;

    dataProductos: any = [];

    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private modalservice: ModalservicesService,
        private appointmentsService: AppointmentsService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data: any,
        private swalservice: SwalServiceService
    ) {
        console.log(data);

        if (data.showcheck == false) {
            this.showCheckNombre = data.showcheck;
        }
        this.dataFactura = data;
    }

    obj = {
        PaymentType: '',
        walletPayment: {
            nameWallet: '',
            codRefPay: '',
        },
    };

    ngOnInit(): void {
        console.log(this.dataFactura);
        this.businessData = this.modalservice.getBusinessData();
        this.preFactura = this._formBuilder.group({
            appointmentID: [''],
            docuUser: ['', Validators.required],
            managerDiscount: [0],
            tax: [0],
            paymentMethod: [this.obj, Validators.required],

            code: [''],
            electronicBilling: [true],
            observationBilling: [''],

            document: ['', Validators.required],
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            movil: [''],
            checked: new FormControl(false),
            product_sales: this._formBuilder.array([]),
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    methodSelected(event: select) {
        console.log(event);
        this.obj.PaymentType = event.valor.paymentMethod;
        this.obj.walletPayment.nameWallet = event.valor.paymentMethod;
    }

    validateReference() {
        return this.obj?.PaymentType != 'Efectivo';
    }

    createPreBillingMan(stepper: MatStepper) {
        let code: string = this.preFactura.get('code')?.value;
        this.obj.walletPayment.codRefPay = code.toUpperCase();
        const loading = this.swalservice.getLoading();

        const valueBody = this.preFactura.getRawValue();
        valueBody.appointmentID = this.dataFactura._id
            ? this.dataFactura._id
            : '';
        valueBody.tax = [{ description: 'IVA', value: valueBody.tax }];
        valueBody.paymentMethod = [this.obj];

        let data_factura = {
            document: this.preFactura.get('document')?.value,
            fullName: this.preFactura.get('fullName')?.value,
            email: this.preFactura.get('email')?.value,
            movil: this.preFactura.get('movil')?.value,
        };
        valueBody.electronicInvoiceUser = data_factura;
        console.log(valueBody);

        this.appointmentsService
            .processPayBillingMan('bill', valueBody)
            .subscribe(
                (bill: any) => {
                    loading.close();
                    this.PayBill = bill.msg;
                    stepper.next();
                },
                (error: any) => {
                    console.error('Error en la llamada al API:', error);
                    loading.close();
                    this._snackBar.open(
                        error.error.msg
                            ? error.error.msg
                            : 'Error Al consultar información',
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

    setDataCliente(event: any) {
        console.log('====================================');
        console.log(this.preFactura.value, this.dataFactura);
        console.log('====================================');

        if (this.preFactura.get('checked')?.value == true) {
            let full_name =
                this.dataFactura.user.nomUser +
                ' ' +
                this.dataFactura.user.apeUser;
            this.preFactura.patchValue({
                fullName: full_name,
            });
            this.preFactura.patchValue({
                email: this.dataFactura.user.emailUser,
            });
            this.preFactura.patchValue({
                movil: this.dataFactura.user.movilUser,
            });
        } else {
            this.preFactura.patchValue({
                fullName: '',
            });
            this.preFactura.patchValue({
                email: '',
            });
            this.preFactura.patchValue({
                movil: '',
            });
        }
    }

    RealizarPagoBill() {
        console.log(this.PayBill);
        const loading = this.swalservice.getLoading();

        this.appointmentsService
            .processPayBillingMan('bill/pay', this.PayBill)
            .subscribe(
                (bill) => {
                    loading.close();
                    if (bill.ok) {
                        this._snackBar.open(
                            'Factura registrada exitosamente!!!',
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
                            'Error al registrar la factura!!!',
                            '',
                            {
                                horizontalPosition: this.horizontalPosition,
                                verticalPosition: this.verticalPosition,
                                duration: this.durationInSeconds * 1000,
                            }
                        );
                    }
                },
                (error) => {
                    console.log('====================================');
                    console.log(error);
                    console.log('====================================');
                    this._snackBar.open(
                        error.error.msg
                            ? error.error.msg
                            : 'Error Al consultar información',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                    loading.close();
                }
            );
    }

    get getProduct(): any {
        return this.preFactura.get('product_sales') as FormArray;
    }

    addProduct() {
        const productoForm = this._formBuilder.group({
            producto: [''],
        });
        this.getProduct.push(productoForm);
    }

    borrarProducto(indice: number) {
        this.getProduct.removeAt(indice);
    }

    patchValueCantidad(indice: number, event: any) {
        let value = Number(event.target.value);
        let control = this.getProduct.at(indice);
        let obj_anterior = control.value.producto;
        obj_anterior.amount = value;
        obj_anterior.payTax = false;
        obj_anterior.discount = 0;
        obj_anterior.inventories_items = obj_anterior._id;
        control.patchValue(obj_anterior);
    }

    validateButton() {
        return (
            this.preFactura.invalid ||
            this.preFactura.get('paymentMethod')?.value.PaymentType == ''
        );
    }
}
