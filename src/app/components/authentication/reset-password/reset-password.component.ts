import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

    hide = true;
    resetPassForm: FormGroup;
    showAlert: boolean = false;
    validar: boolean = false;
    progress3: number;

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
        this.resetPassForm = this._formBuilder.group({
                pass: ['', Validators.required],
                validationPass: ['', Validators.required],
                codValidateUser: ['', Validators.required],
            }
        );
    }

    /**
     * Register
     */
    resetPassword(): void
    {
        // Do nothing if the form is invalid
        if ( this.resetPassForm.invalid )
        {
            return;
        }
        if (!this.validateClient()) {
            return;
        }

        // Disable the form
        this.resetPassForm.disable();

        // Hide the alert
        this.showAlert = false;
        const body = this.resetPassForm.getRawValue();
        console.log(body)
        // Reset password
        this._authService.resetPassword(body)
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/auth/login');
                },
                (response) => {

                    // Re-enable the form
                    this.resetPassForm.enable();

                    // Reset the form
                    this.resetPassForm.reset();

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

    validateClient() {
    const confirmPassword = this.resetPassForm.controls["validationPass"].value;
    if (!this.validar) {
      this.validar = true;
    //   this.validate(this.validar, this.PasswordOk(), 'La contraseña no es segura', 'confirmPassword');
      this.validate(
        this.validar,
        this.resetPassForm.controls["pass"].value === confirmPassword,
        'Las contraseñas no coinciden',
        'confirmPassword',
      );
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

  validarNumber(){
    const regex =  /\d/
    return regex.test(this.resetPassForm.get('pass')?.value.trim())
  }

  validarMayus(){
    const regex =  /[A-Z]/
    return regex.test(this.resetPassForm.get('pass')?.value.trim())
  }

  validarChar(){
    const regex =  /\W/
    return regex.test(this.resetPassForm.get('pass')?.value.trim())
  }

  MatchPassword(){
    if(this.resetPassForm.get('pass')?.value == '' && this.resetPassForm.get('validationPass')?.value == ''){
      return null
    }
    this.progress3 = 100;
   return this.resetPassForm.get('pass')?.value ==this.resetPassForm.get('validationPass')?.value
  }

  fireToast(msg:any) {
    Swal.fire('Información', msg, 'info');
  }

  PasswordOk() {
    const regex = /\d/;
    const regex1 = /[A-Z]/;
    const regex2 = /\W/;

    return (
      regex.test(this.resetPassForm.get('pass')?.value.trim()) &&
      regex1.test(this.resetPassForm.get('pass')?.value.trim()) &&
      regex2.test(this.resetPassForm?.get('pass')?.value.trim()) &&
      this.resetPassForm.get('pass')?.value.trim().length >= 8
    );
  }

}
