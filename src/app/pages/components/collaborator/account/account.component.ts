import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { AccountService } from 'src/app/pages/services/user/account.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponentColl {

    @ViewChild('accountNgForm') accountNgForm: NgForm;
    accountForm: FormGroup;
    validar: boolean = false;
    showAlert: boolean = false;
    user: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private _accountService: AccountService,
        private _formBuilder: FormBuilder,
        private _router: Router
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

        this._accountService.getAccountFun().subscribe((account:any) => {
            this.user = account.userDB ? account.userDB : account.msg;
            console.log(this.user, account.msg)
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
        this.showAlert = false;
        let body = this.accountForm.value;
        // Sign up
        this._accountService.updateAccountFun(body, this.user.uid)
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this.ngOnInit();
                    this.accountForm.enable();
                },
                (response) => {

                    // Re-enable the form
                    this.accountForm.enable();


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
