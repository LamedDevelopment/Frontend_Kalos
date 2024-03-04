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
    payLoans: any = [];
    dataTosend: any;
    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private fb: FormBuilder,
        private managerservice: ManagerService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        console.log('====================================');
        console.log(this.data);
        console.log('====================================');
        let body = {
            collaID: this.data.element.collaID,
        };

        this.total_pagar = this.data.element.BusinessCommissionValue;

        this.managerservice.getpayloans('lose/payloans', body).subscribe(
            (response: any) => {
                if (response.ok == true) {
                    this.dataLoans = response.msg;
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
        console.log(index, item);
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
            this.payLoans.splice(index, 0, obj);
        } else {
            this.payLoans.splice(index, 1); // eliminar del array
        }

        this.preRoll();
    }

    preRoll() {
        let body = {
            business: this.business,
            Collaborator: this.Collaborator,
            BusinessCommissionValue: this.data.element.BusinessCommissionValue,
            payLoans: this.payLoans,
        };
        this.managerservice.preRoll('payroll/prepayroll', body).subscribe(
            (response: any) => {
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

        this.dataTosend.commissionDateRange = {
            datastart: this.data.datastart,
            dateEnd: this.data.dateEnd,
        };

        console.log(this.dataTosend);

        this.managerservice
            .preRoll('payroll/paypayroll', this.dataTosend)
            .subscribe(
                (response: any) => {
                    if (response.ok == true) {
                        console.log('====================================');
                        console.log(response);
                        console.log('====================================');
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
