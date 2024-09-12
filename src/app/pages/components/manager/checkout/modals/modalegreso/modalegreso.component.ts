import { Component, Inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as moment from 'moment';
import { select } from 'src/app/pages/common/Interfaces/select.interface';
import { ModalserviceComponent } from 'src/app/pages/components/collaborator/modals/modalservice/modalservice.component';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-modalegreso',
    templateUrl: './modalegreso.component.html',
    styleUrls: ['./modalegreso.component.scss'],
})
export class ModalegresoComponent {
    startServiceform: FormGroup;
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
    ) {}

    ngOnInit(): void {
        this.startServiceform = this.fb.group({
            businessID: [''],
            tradename: [''],
            paymentMethod: [''],
            amountPaid: [''],
            payees: [''],
            descriptionExpenditure: ['', [Validators.required]],
            expenditureDate: [''],
            categorizationExpenditures: [''],
            approvalOfExpenditures: [''],
        });

        this.patchBussines();
    }

    patchBussines() {
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        console.log(datauser);
        this.startServiceform.patchValue({
            businessID: datauser.business,
        });
        this.startServiceform.patchValue({
            tradename: datauser.branchOffices[0].tradeName,
        });
    }

    methodSelected(event: select) {
        console.log(event);
        this.startServiceform.patchValue({
            paymentMethod: event.valor.paymentMethod,
        });
    }

    onDateChange(event: MatDatepickerInputEvent<Date>): void {
        const selectedDate = event.value;
        if (selectedDate) {
            const formattedDate = moment(selectedDate).format('DD-MM-YYYY');

            this.startServiceform.patchValue({
                expenditureDate: formattedDate,
            });
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }

    get amountPaidControl(): FormControl {
        return this.startServiceform.get('amountPaid') as FormControl;
    }

    public createEgreso() {
        this.managerservice.createEgreso(this.startServiceform.value).subscribe(
            (response) => {
                if (response.ok) {
                    this._snackBar.open(
                        response.msg ? response.msg : 'Éxito al generar egreso',
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
                            response.msg
                            ? response.msg
                            : 'Error Al consultar información',
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
            }
        );
    }
}
