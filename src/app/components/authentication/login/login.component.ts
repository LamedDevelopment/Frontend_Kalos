import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { CreateUserDialogBox } from 'src/app/shared/componentsShared/modal-dialog/modal-dialog.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    @ViewChild('politicasPrivacidad') politicasPrivacidad: TemplateRef<any>;
    signInForm: FormGroup;
    showAlert: boolean = false;
    datAuth: any;

    hide = true;

    constructor(
        public themeService: CustomizerSettingsService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public dialog: MatDialog,
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            pass: ['', Validators.required],
            rememberMe: [false],
        });
    }

    openCreateUserDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(CreateUserDialogBox, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration
        });
    }

    /**
     * Sign in
     */
    signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
        return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(
        (res) => {
        // Set the redirect url.
        // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        // to the correct page after a successful sign in. This way, that url can be set via
        // routing file and we don't have to touch here.
        const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/home'
            /* Array.isArray(res.data.auth_info.user.id_rol)
            ? res.data.auth_info.user.id_rol.includes(1)
                ? '/subjects'
                : '/dashboard'
            : '/dashboard'; */

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
        },
        (response) => {
        // Re-enable the form
        this.signInForm.enable();

        // Reset the form
        this.signInNgForm.resetForm();

        // Set the alert
        this.openCreateUserDialog('300ms', '100ms')
        // Show the alert
        this.showAlert = true;
        },
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
