import { ChangeDetectorRef, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../../collaborator/modals/modalservice/modalservice.component';

@Component({
    selector: 'app-configModal',
    templateUrl: './configModal.component.html',
    styleUrls: ['./configModal.component.scss'],
})
export class configModalComponent {
    businessForm: FormGroup;
    businessData: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });

    @ViewChild('Bancos') bancosTemplate!: TemplateRef<any>;
    @ViewChild('Turnos') turnosTemplate!: TemplateRef<any>;
    @ViewChild('Colaboradores') colaboratorsTemplate!: TemplateRef<any>;
    @ViewChild('Almacen') almacenTemplate!: TemplateRef<any>;
    @ViewChild('Cargue_de_Inventarios') inventariosTemplate!: TemplateRef<any>;
    @ViewChild('Cargue_de_Servicios') serviciosTemplate!: TemplateRef<any>;
    @ViewChild('Promociones') promocionesTemplate!: TemplateRef<any>;
    @ViewChild('Tipos_de_Descuentos') descuentosTemplate!: TemplateRef<any>;
    @ViewChild('Card_VIP') vipTemplate!: TemplateRef<any>;

    selectedTemplate: TemplateRef<any> | null = null;
    url: string = '';
    datauser: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private appointmentsService: AppointmentsService,
        private _snackBar: MatSnackBar,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit(): void {
        this.datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
    }

    ngAfterViewInit() {
        switch(this.data.selectedTemplate) {
          case "Bancos":
            this.selectedTemplate = this.bancosTemplate;
            this.url = 'bafe'
            this.businessForm = this.fb.group({
              business: this.fb.group({
                business: [''],
                nit: [''],
                nameBusiness: [''],
                tradename: ['']
              }),
              bank_info: this.fb.array([
                this.fb.group({
                  increases_fee: [false, Validators.required],
                  bank_name: ['', Validators.required],
                  bank_account_number: ['', Validators.required],
                  bank_fee_percentage_credit_card: ['', Validators.required],
                  bank_fee_percentage_debit_card: ['', Validators.required],
                  bank_fee_percentage_transaction: ['', Validators.required],
                  bank_fee_cash: ['', Validators.required],
                  note: ['']
                })
              ]),
              electronicBill: this.fb.group({
                emailAuth: [''],
                datoAuth: [''],
                authorization: ['']
              })
            });

            this.appointmentsService
            .getInfoBanco('bafe/viewall')
            .subscribe((bnk: any) => {
                if (bnk.ok) {
                    console.log(bnk)
                    const dataFromEndpoint = bnk.msg
                    this.businessForm.patchValue({
                      business: {
                        business: this.datauser.business,
                        nit: this.datauser.nit,
                        nameBusiness: this.datauser.businessName,
                        tradename: this.datauser.branchOffices[0].tradeName
                      },
                      bank_info: [
                        {
                          increases_fee: dataFromEndpoint.bank_info[0].increases_fee,
                          bank_name: dataFromEndpoint.bank_info[0].bank_name,
                          bank_account_number: dataFromEndpoint.bank_info[0].bank_account_number,
                          bank_fee_percentage_credit_card: dataFromEndpoint.bank_info[0].bank_fee_percentage_credit_card,
                          bank_fee_percentage_debit_card: dataFromEndpoint.bank_info[0].bank_fee_percentage_debit_card,
                          bank_fee_percentage_transaction: dataFromEndpoint.bank_info[0].bank_fee_percentage_transaction,
                          bank_fee_cash: dataFromEndpoint.bank_info[0].bank_fee_cash,
                          note: dataFromEndpoint.bank_info[0].note
                        }
                      ],
                      electronicBill: {
                        emailAuth: dataFromEndpoint.electronicBill.emailAuth,
                        datoAuth: dataFromEndpoint.electronicBill.datoAuth,
                        authorization: dataFromEndpoint.electronicBill.authorization
                      }
                    });
                } else {
                    this._snackBar.open(
                        'Error al procesar la solicitud!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                }
            });

            break;
          case "Turnos":
            this.selectedTemplate = this.turnosTemplate;
            break;
          case "Colaboradores":
            this.selectedTemplate = this.colaboratorsTemplate;
            break;
          case "Almacen":
            this.selectedTemplate = this.almacenTemplate;
            break;
          case "Cargue_de_Inventarios":
            this.selectedTemplate = this.inventariosTemplate;
            break;
          case "Cargue_de_Servicios":
            this.selectedTemplate = this.serviciosTemplate;
            break;
          case "Promociones":
            this.selectedTemplate = this.promocionesTemplate;
            break;
          case "Tipos_de_Descuentos":
            this.selectedTemplate = this.descuentosTemplate;
            break;
          case "Card_VIP":
            this.selectedTemplate = this.vipTemplate;
            break;
          default:
            this.selectedTemplate = null;
            break;
        }
        this.cdr.detectChanges();
    }

    closeDialog() {
        this.dialogRef.close();
    }

    get bankInfo(): FormArray {
        return this.businessForm.get('bank_info') as FormArray;
    }

    addBankInfo(): void {
        this.bankInfo.push(this.fb.group({
            increases_fee: [false],
            bank_name: [''],
            bank_account_number: [''],
            bank_fee_percentage_credit_card: [''],
            bank_fee_percentage_debit_card: [''],
            bank_fee_percentage_transaction: [''],
            bank_fee_cash: [''],
            note: ['']
        }));
    }

    removeBankInfo(index: number): void {
        this.bankInfo.removeAt(index);
    }

    onSubmit(): void {
        const body = this.businessForm.getRawValue();
        console.log(body);
        this.appointmentsService
            .processPayBillingMan(this.url, body)
            .subscribe((bill: any) => {
                if (bill.ok) {
                    this._snackBar.open(
                        'Solicitud procesada exitosamente!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                    this.dialogRef.close();
                } else {
                    this._snackBar.open(
                        'Error al procesar la solicitud!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                }
            });
    }

    /* ProcessSol() {
        const valueBody = this.preFactura.getRawValue();
        console.log(valueBody);
        this.appointmentsService
            .processPayBillingMan('lose/prolo', valueBody)
            .subscribe((bill: any) => {
                if (bill.ok) {
                    this._snackBar.open(
                        'Solicitud procesada exitosamente!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                    this.dialogRef.close();
                } else {
                    this._snackBar.open(
                        'Error al procesar la solicitud!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                }
            });
    } */
}
