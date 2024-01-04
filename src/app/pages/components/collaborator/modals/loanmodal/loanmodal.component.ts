import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../modalservice/modalservice.component';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-loanmodal',
    templateUrl: './loanmodal.component.html',
    styleUrls: ['./loanmodal.component.scss'],
})
export class LoanmodalComponent {
    loanServiceform: FormGroup;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;

    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private _getAppointment: AppointmentsService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loanServiceform = this._formBuilder.group({
            loanAmount: [''],
            paymentDeadline: [''],
            loanDetail: [''],
        });
    }

    get loanAmountControl(): FormControl {
        return this.loanServiceform.get('loanAmount') as FormControl;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    startLoan() {
        this._getAppointment.loadService(this.loanServiceform.value).subscribe(
            (response) => {
                if (response.ok == true) {
                    this._snackBar.open(response.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.dialogRef.close();
                }
            },
            (error) => {}
        );
    }
}
