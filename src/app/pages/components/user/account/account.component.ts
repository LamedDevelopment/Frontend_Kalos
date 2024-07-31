import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/pages/services/user/account.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent {

    @ViewChild('accountNgForm') accountNgForm: NgForm;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    accountForm: FormGroup;
    validar: boolean = false;
    showAlert: boolean = false;
    user: any;
    datosUpdates: boolean = true;
    constructor(
        public themeService: CustomizerSettingsService,
        private _accountService: AccountService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.accountForm = this._formBuilder.group({
                name:['', Validators.required],
                lastName:['', Validators.required],
                celusu:['', Validators.required],
                email:['', [Validators.required, Validators.email]],
                city:['', Validators.required],
                address:['', Validators.required],
                birthdate:['', Validators.required],
                gender:['', Validators.required],
            }
        );

        this._accountService.getAccount().subscribe((account:any) => {
            this.user = account.userDB;
            console.log(this.user)
            if(this.user){
                // Create the form
                this.accountForm.controls["name"].setValue(this.user.name);
                this.accountForm.controls["lastName"].setValue(this.user.lastName);
                this.accountForm.controls["celusu"].setValue(this.user.movil);
                this.accountForm.controls["email"].setValue(this.user.email);
                this.accountForm.controls["city"].setValue(this.user?.city);
                this.accountForm.controls["address"].setValue(this.user?.address);
                this.accountForm.controls["birthdate"].setValue(this.user?.birthdate);
                this.accountForm.controls["gender"].setValue(this.user?.gender);
            }
        })
    }


    /**
     * Update Account
     */
    updateAccount(): void
    {
        // Do nothing if the form is invalid
        if ( this.accountForm.invalid )
        {
            return;
        }

        // Disable the form
        this.accountForm.disable();

        // Hide the alert
        this.datosUpdates = false;
        this.showAlert = false;
        let body = this.accountForm.value;
        // Sign up
        this._accountService.updateAccount(body, this.user.uid)
            .subscribe(
                (response) => {
                    this.datosUpdates = true;
                    // Navigate to the confirmation required page
                    this._snackBar.open('Datos actualizados', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.ngOnInit();
                    this.accountForm.enable();
                },
                (response) => {

                    // Re-enable the form
                    this.accountForm.enable();
                    this._snackBar.open('Error al actualizar los datos', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.datosUpdates = true;
                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
