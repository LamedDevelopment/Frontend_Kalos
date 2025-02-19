import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { CreateUserDialogBox } from 'src/app/shared/componentsShared/modal-dialog/modal-dialog.component';
import { FacebookAuthService } from "src/app/shared/services/auth-Fb.service.service";
import { AuthLoginGoogleService } from 'src/app/shared/services/auth-login-google.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';


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
        private authLoginGoogleService: AuthLoginGoogleService,
        private authServiceFB: FacebookAuthService,
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this._authService.signOut()
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            pass: ['', Validators.required],
            rememberMe: [false],
        });
        setTimeout(() => {
            this.showData();
        }, 900);

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
        this.postLogin(this.signInForm.value);

    }

    postLogin(value: any) {
        // Sign in
        console.log('Datos enviados al PostLogin: ',value);
        this._authService.signIn(value).subscribe(
            async (res) => {
                if(res.ok){
                    const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/user/lounges';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);
                } else {
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.openCreateUserDialog('300ms', '100ms')
                    // Show the alert
                    this.showAlert = true;
                }

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

    showData() {
        // const data = this.authLoginGoogleService.getProfile();
        const data = sessionStorage.getItem('id_token');
        if(data){
            const body = this.signInForm.getRawValue();
            body.googleToken = data;
            this.postLogin(body);

        }
    }
    loginOauth() {
        console.log('entro a Oauth')
        this.authLoginGoogleService.login();
    }

    signInWithFB(): void {
        this.authServiceFB.loginWithFacebook().then((response) => {
            this.authServiceFB.getUserDetails().then((userData) => {
                // Aquí obtienes los datos de usuario de Facebook
                console.log(userData);
    
                // Ahora crea el cuerpo para el login
                const fbLoginData = {
                    name: userData.name,
                    email: userData.email,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    fbId: userData.id,
                    facebookToken: response.accessToken, // Este es el token de acceso de Facebook que necesitas enviar al backend
                };
    
                // Llama al método postLogin para enviar los datos al backend
                this.postLogin(fbLoginData);
            });
        }).catch((error) => {
            console.error('Error al iniciar sesión con Facebook: ', error);
        });
    }

    signOut(): void {
        // this.authService.signOut();
        this.authServiceFB.logout().then(() => {

        });
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
