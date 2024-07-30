import { ChangeDetectorRef, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
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
    displayedColumns: string[] = ['Horario', 'HoraInicio', 'HoraFinal', 'actions'];
    displayedColumnsCola: string[] = ['Nombres', 'Cedula', 'Negocio', 'Sucursal', 'TipoServicio', 'actions'];
    dataSource = new MatTableDataSource<any>();
    horaI: any  = '';
    horaF: string = '';
    startTimeValues: string[] = [];
    checked: boolean = true;

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

        switch(this.data.selectedTemplate) {
          case "Bancos":
            this.inicializarBancos();
            break;
          case "Turnos":
            this.inicializarTurnos();
            break;
          case "Colaboradores":
            this.inicializarColaboradores();
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

    ngAfterViewInit() {
        switch(this.data.selectedTemplate) {
          case "Bancos":
            this.selectedTemplate = this.bancosTemplate;
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

    private inicializarBancos() {
        this.url = 'bafe';
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
    }

    private inicializarTurnos() {
        this.url = 'sf/creahours';
        this.businessForm = this._formBuilder.group({
          business: this._formBuilder.group({
            business: ['', Validators.required],
            nit: ['', Validators.required],
            businessName: ['', Validators.required],
            tradename: ['', Validators.required]
          }),
          TypeOfWorkingHours: this.fb.array([
            this._formBuilder.group({
                nameHours: ['', Validators.required],
                startTime: ['', Validators.required],
                endTime: ['', Validators.required]
            })
          ]),
        });

        this.appointmentsService
          .getInfoBanco('sf/viewtimework')
          .subscribe((tr: any) => {
            if (tr.ok) {
              const dataFromEndpoint = tr.msg[0].daysServices;
              this.businessForm.patchValue({
                business: {
                  business: this.datauser.business,
                  nit: this.datauser.nit,
                  businessName: this.datauser.businessName,
                  tradename: this.datauser.branchOffices[0].tradeName
                }
                // TypeOfWorkingHours: dataFromEndpoint.map((item: any) => this.createWorkingHourGroup(item))
              });
                this.dataSource.data = dataFromEndpoint;
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

    private inicializarColaboradores() {
        this.url = 'bus/reticolla';
        this.businessForm = this._formBuilder.group({
          business: this._formBuilder.group({
            business: ['', Validators.required],
            nit: ['', Validators.required],
            businessName: ['', Validators.required],
            tradename: ['', Validators.required]
          }),
          user: this._formBuilder.group({
                email: ['', Validators.required],
                name: ['', Validators.required],
                lastName: ['', Validators.required],
                document: ['', Validators.required],
            }),
            newStatus: [false, Validators.required]
        });
        this.appointmentsService
        .getInfoBanco('sf/manaall')
        .subscribe((tr: any) => {
            if (tr.ok) {
                const dataFromEndpoint = tr.msg;
                console.log(dataFromEndpoint)
              this.businessForm.patchValue({
                business: {
                  business: this.datauser.business,
                  nit: this.datauser.nit,
                  businessName: this.datauser.businessName,
                  tradename: this.datauser.branchOffices[0].tradeName
                }
              });
              this.dataSource.data = dataFromEndpoint;
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

    get bankInfo(): FormArray {
        return this.businessForm.get('bank_info') as FormArray;
    }

    get TypeOfWorkingHours(): FormArray {
        return this.businessForm.get('TypeOfWorkingHours') as FormArray;
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

    convertToMilitaryTime(time: string): string {
      const [timeString, modifier] = time.split(' ');

      let [hours, minutes] = timeString.split(':');

      if (hours === '12') {
        hours = '00';
      }

      if (modifier === 'PM') {
        hours = (parseInt(hours, 10) + 12).toString();
      }
      const hourFinal = Number(hours) > 10 ? hours :`0${hours}`
      return `${hourFinal}:${minutes}`;
    }



    onTimeChangeStart(event: any) {
      const militaryTime = this.convertToMilitaryTime(event.target.value);
      console.log(militaryTime);
      const typeOfWorkingHoursArray = this.businessForm.get('TypeOfWorkingHours') as FormArray;
      const workHourGroup = typeOfWorkingHoursArray.at(0) as FormGroup;
      workHourGroup.get('startTime')?.setValue(militaryTime);
    }

    onTimeChangeEnd(event: any) {
      const militaryTime = this.convertToMilitaryTime(event.target.value);
      console.log(militaryTime);
      const typeOfWorkingHoursArray = this.businessForm.get('TypeOfWorkingHours') as FormArray;
      const workHourGroup = typeOfWorkingHoursArray.at(0) as FormGroup;
      workHourGroup.get('endTime')?.setValue(militaryTime);
    }


    removeBankInfo(index: number): void {
        this.bankInfo.removeAt(index);
    }

    private createWorkingHourGroup(data?: any): FormGroup {
        return this._formBuilder.group({
            nameHours: [data ? data.nameHours : '', Validators.required],
            startTime: [data ? data.startTime : '', Validators.required],
            endTime: [data ? data.endTime : '', Validators.required]
        });
    }

    removeRecord(index: number) {
        const data = this.dataSource.data;
        data.splice(index, 1);
        this.dataSource.data = data;
    }

    addWorkingHour() {
        this.TypeOfWorkingHours.push(this.createWorkingHourGroup());
    }

    removeWorkingHour(index: number) {
        this.TypeOfWorkingHours.removeAt(index);

        if (this.TypeOfWorkingHours.length === 0) {
          this.addWorkingHour();
        }
    }


    onSubmit(): void {
        const body = this.businessForm.getRawValue();
        body.TypeOfWorkingHours[0].startTime = this.convertToMilitaryTime(body.TypeOfWorkingHours[0].startTime)
        body.TypeOfWorkingHours[0].endTime = this.convertToMilitaryTime(body.TypeOfWorkingHours[0].endTime)
        console.log(body, this.url);
        this.appointmentsService
            .processPayBillingMan(this.url, body)
            .subscribe((bill: any) => {
                if (bill.ok) {
                    this.addWorkingHour();
                    this.inicializarTurnos()
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


    statusColaborador(col: any){
        const body = this.businessForm.getRawValue();
        body.user.document = col.user.document;
        body.user.email = col.user.email;
        body.user.lastName = col.user.lastName;
        body.user.name = col.user.name;
        body.newStatus = !col.status;
        col.status = !col.status;
        this.appointmentsService
            .processPayBillingMan(this.url, body)
            .subscribe((bill: any) => {
                if (bill.ok) {
                    this.inicializarColaboradores()
                    this._snackBar.open(
                        'Solicitud procesada exitosamente!!!',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );
                    // this.dialogRef.close();
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

}
