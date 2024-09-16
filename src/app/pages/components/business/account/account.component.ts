import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';
import FormDataAxios from 'form-data';
import { Subject, takeUntil } from 'rxjs';
import { ServicesService } from 'src/app/pages/services/services.service';
import { AccountService } from 'src/app/pages/services/user/account.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponentBis {
    @Input()
    agendamiento: any;
    @Input()
    edit: boolean;
    @Input()
    number:number;
    @Output() setAgendamiento: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('accountNgForm') accountNgForm: NgForm;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    accountForm: FormGroup;
    validar: boolean = false;
    showAlert: boolean = false;
    data: any;
    user: any;
    userData: any;
    datosUpdates: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    tokenUser: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private _accountService: AccountService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _userService: UserService,
        private _userToken: ServicesService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.userData = user;
            });
        this._userToken.InfoUserApi().subscribe((data:any) => {
            this.tokenUser = data.msg.staff.img;
        });
        // Create the form
        this.accountForm = this._formBuilder.group({
                name:['', Validators.required],
                lastName:['', Validators.required],
                document:['', Validators.required],
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
            console.log(this.user)
            if(this.user){
                // Create the form
                this.accountForm.controls["name"].setValue(this.user.name);
                this.accountForm.controls["lastName"].setValue(this.user.lastName);
                this.accountForm.controls["document"].setValue(this.maskDocument(this.user.document));
                this.accountForm.controls["celusu"].setValue(this.user.movil);
                this.accountForm.controls["email"].setValue(this.maskEmail(this.user.email));
                this.accountForm.controls["city"].setValue(this.user?.city);
                this.accountForm.controls["address"].setValue(this.user?.address);
                this.accountForm.controls["birthdate"].setValue(this.user?.birthdate);
                this.accountForm.controls["gender"].setValue(this.user?.gender);
            }
        })
    }

    maskDocument(value: number): string {
        const valueStr = value.toString(); // Convertir el número a string
        if (valueStr.length > 5) {
            return `${valueStr.slice(0, 2)}******${valueStr.slice(-3)}`;
        }
        return valueStr; // Retorna el número como string
    }

    maskEmail(email: string): string {
        const [localPart, domain] = email.split('@'); // Separar localPart y dominio
    
        if (localPart.length > 4) {
            // Enmascarar dejando el primer carácter y los últimos tres de la parte local
            return `${localPart.slice(0, 2)}******${localPart.slice(-3)}@${domain}`;
        }
        // Si la parte local es muy corta, solo devolver el email completo
        return email;
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
        this._accountService.updateAccountFun(body, 'bususu/upcolla')
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

    async uploadFileLong(event:any){
        console.log(event)
        if (!this.data) {
            this.data = { archivos: [] }; // Inicializa `data` si está `undefined`
        }

        if(event.files.length === 0){
            this.data!.archivos = [];
        } else {
            this.data!.archivos = [];
            let token = sessionStorage.getItem('accessToken');
            const formDataIm = new FormDataAxios();

            formDataIm.append('businessID', this.userData.business.business);
            formDataIm.append('nameBusiness', this.userData.business.businessName);
            formDataIm.append('businessNit', this.userData.business.nit);
            formDataIm.append('tradename', this.userData.business.branchOffices[0].tradeName);

            event.files.forEach((item:any) => {
                formDataIm.append('file', item);
                // this.data!.archivos.push(item);
            })

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://devback.bellezaap.com/api/v1/doc/upimgcolla',
              headers: {
                'x-token': token,
                // ...formDataIm.getHeaders()
              },
              data : formDataIm
            };

            axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response));
              this.ngOnInit();
            })
            .catch((error) => {
              console.log(error.response.data.msg);
            });

        }

    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
