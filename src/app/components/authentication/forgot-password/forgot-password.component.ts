import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    signUpForm: FormGroup;
    showAlert: boolean = false;
    validar: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                email     : ['', [Validators.required, Validators.email]]
            }
        );
    }

    /**
     * Sign up
     */
    ForgotPass(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;
        const body = this.signUpForm.getRawValue();
        // Sign up
        this._authService.forgotPassword(body)
            .subscribe(
                (response) => {
                    console.log(response)
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/auth/login');
                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
