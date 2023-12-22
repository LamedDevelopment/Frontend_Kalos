import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { CreateUserDialogBox } from 'src/app/shared/componentsShared/modal-dialog/modal-dialog.component';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponentFun {
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
        public dialog: MatDialog
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
        this.validateRol();
    }

    openCreateUserDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ): void {
        this.dialog.open(CreateUserDialogBox, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration,
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
        this._authService.signInFun(this.signInForm.value).subscribe(
            async (res: any) => {
                if (res.ok) {
                    this.validateRol();
                } else {
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.openCreateUserDialog('300ms', '100ms');
                    // Show the alert
                    this.showAlert = true;
                }
            },
            (response: any) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.openCreateUserDialog('300ms', '100ms');
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

    validateRol() {
        let token: any = sessionStorage.getItem('accessToken');
        let redirectURL = '';
        if (token) {
            const decoded: any = jwtDecode(token);
            console.log('decoded', decoded);
            let role = decoded?.role?.code;
            if (role == 'CLLTR_ROLE') {
                redirectURL = '/colla/dash';
            } else if (role == 'MANAGER_ROLE') {
                redirectURL = '/bus/dash';
            } else if (role == 'ADMIN_ROLE') {
                redirectURL = '/bus/dash';
            }
        } else {
            redirectURL = 'auth/login-fun';
        }

        this._router.navigate([redirectURL]);
    }
}
