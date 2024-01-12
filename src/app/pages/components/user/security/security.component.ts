import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/pages/services/user/account.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.scss']
})
export class SecurityComponent {

    hide = true;
    @ViewChild('accountNgForm') accountNgForm: NgForm;
    accountForm: FormGroup;
    validar: boolean = false;
    showAlert: boolean = false;

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
                pass:['', Validators.required],
                validationPass:['', Validators.required],
                passOld:['', Validators.required],
            }
        );
    }

    /**
     * Update Account
     */
    updatePass(): void
    {
        console.log('Here', this.accountForm.value)
        // Do nothing if the form is invalid
        if ( this.accountForm.invalid )
        {
            return;
        }
        if (!this.validateClient()) {
            return;
        }

        // Disable the form
        this.accountForm.disable();

        // Hide the alert
        this.showAlert = false;
        let body = this.accountForm.value;
        // Sign up
        this._accountService.updatePass(body)
            .subscribe(
                (response) => {
                    console.log(response)
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

    validateClient() {
    if (!this.validar) {
      this.validar = true;
      this.validate(this.validar, this.PasswordOk(), 'La contraseña no es segura', 'confirmPassword');
    }
    return this.validar;
  }

  validate(validate:any, condition:any, msg:any, id:any) {
    if (validate) {
      if (!condition) {
        this.validar = false;
        this.fireToast(msg);
        return false;
      }
    }
  }

  fireToast(msg:any) {
    Swal.fire('Información', msg, 'info');
  }

    PasswordOk() {
    const regex = /\d/;
    const regex1 = /[A-Z]/;
    const regex2 = /\W/;

    return (
      regex.test(this.accountForm.get('pass')?.value.trim()) &&
      regex1.test(this.accountForm.get('pass')?.value.trim()) &&
      regex2.test(this.accountForm?.get('pass')?.value.trim()) &&
      this.accountForm.get('pass')?.value.trim().length >= 8
    );
  }

}
