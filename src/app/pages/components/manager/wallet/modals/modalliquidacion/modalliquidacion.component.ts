import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBar,
} from '@angular/material/snack-bar';
import { ModalserviceComponent } from 'src/app/pages/components/collaborator/modals/modalservice/modalservice.component';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-modalliquidacion',
    templateUrl: './modalliquidacion.component.html',
    styleUrls: ['./modalliquidacion.component.scss'],
})
export class ModalliquidacionComponent {
    dataLoans: any = [];
    business: any = null;
    Collaborator: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    displayedColumns: string[] = ['item', 'VlSolicitado', 'cuotas'];
    total_pagar: number = 0;
    payLoans: Array<any> = [];
    dataTosend: any;
    dataTosendnoLoans: any;
    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private fb: FormBuilder,
        private managerservice: ManagerService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private alert: SwalServiceService
    ) {}

    ngOnInit(): void {
        console.log(this.data);

        this.getData();
    }

    getData() {
        let body = {
            collaID: this.data.element.collaID,
        };

        this.total_pagar = this.data.element.BusinessCommissionValue;

        this.managerservice.getpayloans('lose/payloans', body).subscribe(
            (response: any) => {
                console.log(response);
                if (response.ok == true) {
                    if (
                        'loanAmount' in response?.msg.business ||
                        'loanAmount' in response?.msg.Collaborator
                    ) {
                        this.dataLoans = response.msg;
                    } else if (
                        Array.isArray(response?.msg) &&
                        'loanAmount' in response?.msg[0]
                    ) {
                        this.dataLoans = response.msg;
                    } else {
                        console.log('sin prestamos');

                        this.dataTosendnoLoans = response.msg;
                    }
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

    onSelected(event: any, index: number, item: any) {
        console.log(item);
        let check = event.target.checked;
        this.business = item.business;
        this.Collaborator = item.Collaborator;
        if (check) {
            let obj = {
                loanAmount: item.loanAmount,
                paymentDeadline: item.paymentDeadline,
                loanDetail: item.loanDetail,
                applicationDate: item.applicationDate,
                loanStatus: item.loanStatus,
                prePay: item.prePay,
                newLoanBalance: item.newLoanBalance,
                paymentFees: item.paymentFees,
                loansID: item.loansID,
            };
            console.log(obj);

            this.payLoans.splice(index, 0, obj);
        } else {
            if (this.payLoans.length == 1) {
                this.payLoans = [];
            } else {
                this.payLoans.splice(index, 1); // eliminar del array
            }
        }

        this.preRoll();
    }

    preRoll() {
        const loading = this.alert.getLoading('Recalculando');
        let body = {
            business: this.business,
            Collaborator: this.Collaborator,
            BusinessCommissionValue: this.data.element.BusinessCommissionValue,
            payLoans: this.payLoans,
        };
        this.managerservice.preRoll('payroll/prepayroll', body).subscribe(
            (response: any) => {
                loading.close();
                if (response.ok == true) {
                    this.total_pagar = response.msg.commissionPayment;
                    this.dataTosend = response.msg;
                } else {
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

    sendData() {
        if (this.total_pagar < 0) {
            this._snackBar.open(
                'No se puede procesar Prenómina con valores negativos',
                '',
                {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                }
            );
        }

        console.log(this.dataTosend);

        if (this.dataTosend) {
            // se tiene prestamos
            this.dataTosend.commissionDateRange = {
                dataStart: this.data.datastart,
                dateEnd: this.data.dateEnd,
            };
            console.log(this.dataTosend);

            this.postData(this.dataTosend);
        } else {
            this.PostSinPrestamos();
        }
    }

    postData(body: any) {
        this.managerservice.preRoll('payroll/paypayroll', body).subscribe(
            (response: any) => {
                if (response.ok == true) {
                    this.closeDialog();
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

    PostSinPrestamos() {
        this.dataTosendnoLoans.BusinessCommissionValue = this.total_pagar;
        this.dataTosendnoLoans.payloans = [];
        this.dataTosendnoLoans.commissionPayment = this.total_pagar;
        this.dataTosendnoLoans.commissionDateRange = {
            dataStart: this.data.datastart,
            dateEnd: this.data.dateEnd,
        };
        this.managerservice
            .preRoll('payroll/paynoloans', this.dataTosendnoLoans)
            .subscribe(
                (response: any) => {
                    if (response.ok == true) {
                        this.closeDialog();
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

    closeDialog() {
        this.payLoans = [];
        this.Collaborator = null;
        this.business = null;
        this.dialogRef.close();
    }
}
