import { AfterViewInit, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser'
import { UserService } from 'src/app/pages/services/user/user.service';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import * as moment from 'moment';

export interface PeriodicElement {
    appointmentDate: Array<any>;
    appointmentStatus: string;
    business:any;
    services: Array<any>;
    user: any;
}
let Business: any;



@Component({
  selector: 'app-appo',
  templateUrl: './appo.component.html',
  styleUrls: ['./appo.component.scss']
})
export class AppointmentComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['product', 'price', 'vendor', 'date', 'status', 'edit', 'delete', 'start'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ELEMENT_DATA: PeriodicElement[];
    dataSource:any;
    pending = true;
    outOfStock = true;
    delivered = true;
    hists: Array<any>;
    search:string = '';
    startStop:boolean = true;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.GetCitas(1);
        this.GetHistoricoCitas();
    }

    ngAfterViewInit() {
        setTimeout(() => {this.dataSource!.paginator = this.paginator}, 500)
    }

    GetCitas(e:any){
        if (e==1) {
            this._getAppointment.getAppointmentDayOrWeekFun('apu/wuapma').subscribe((appo:any) => {
                appo.msg.map((el:any) => {
                    el.startStop = true;
                });
                console.log(appo.msg)
                this.ELEMENT_DATA = appo.msg;
                this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                this.dataSource.filterPredicate = function(data:any, filter: string): boolean {

                      return data.services[0].nameTypeService.toString().toLowerCase().includes(filter)
                      || data.services[0].servicePrice.toString().toLowerCase().inlcides(filter)
                      || data.business.nameBusiness.toLowerCase().includes(filter)
                      || data.appointmentDate[0].dateService.toString().toLowerCase().includes(filter)
                      || data.appointmentDate[0].timeService.toString().toLowerCase().includes(filter)
                };

            });
        } else {
            this._getAppointment.getAppointmentDayOrWeekFun('apu/uapdma').subscribe((appo:any) => {
                appo.msg.map((el:any) => {
                    el.startStop = true;
                });
                this.ELEMENT_DATA = appo.msg;
                this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                this.dataSource.filterPredicate = function(data:any, filter: string): boolean {

                      return data.services[0].nameTypeService.toString().toLowerCase().includes(filter)
                      || data.services[0].servicePrice.toString().toLowerCase().inlcides(filter)
                      || data.business.nameBusiness.toLowerCase().includes(filter)
                      || data.appointmentDate[0].dateService.toString().toLowerCase().includes(filter)
                      || data.appointmentDate[0].timeService.toString().toLowerCase().includes(filter)
                };
            });
        }
    }

    GetHistoricoCitas(){
            this._getAppointment.getAppointmentHistory('apu/hisuap').subscribe((hist:any) => {
                this.hists =  hist.msg;
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openCreateUserDialog(enterAnimationDuration: string, exitAnimationDuration: string, bs:any): void {
        Business = bs;

        this.dialog.open(UpdateAppointmentDialogBox, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration
        }).afterClosed().subscribe(
            data => {
                this.ngOnInit();

            }
        );
    }

    CreateUserDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(CreateAppointmentDialogBox, {
            width: '600px',
            height: '800px',
            disableClose:true,
            enterAnimationDuration,
            exitAnimationDuration
        }).afterClosed().subscribe(
            data => {
                this.ngOnInit();

            }
        );
    }

    CloseAppointment(el:any){
        console.log(el)
        const body = {
            appointmentID: el._id,
            service:el.services[0]._id
        }
        this._getAppointment.deleteAppointmentFun(body)
            .subscribe(
                (response) => {
                    this._snackBar.open('Cita eliminada exitosamente!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.GetCitas(1);
                },
                (response) => {



                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    StartStopService(el:any, type:any){
        console.log(el)
        let body;
        let url;
        if (type ===1) {
            url='apu/iniser';
            body =
                {
                    appointmentID: el._id,
                    businessID: el.business.business,
                    serviceID: el.services[0]._id,
                    staffID: el.services[0].staffServices[0]._id,
                    appointmentDateID: el.appointmentDate[0]._id,
                    observationAppointment: "Datos que el Collaborador ingresa para iniciar el Servicio.",
                    startAddDescriptionService: [{
                        serviceName: "2 Mechones Permanentes Azul y Futcia,",
                        CostService: el.services[0].servicePrice
                    }]
                }
            el.startStop = false
        } else {
            url='apu/finser';
            body =
                {
                    appointmentID: el._id,
                    businessID: el.business.business,
                    serviceID: el.services[0]._id,
                    staffID: el.services[0].staffServices[0]._id,
                    appointmentDateID: el.appointmentDate[0]._id,
                    observationAppointment: "Datos que el Collaborador ingresa para iniciar el Servicio.",
                    endAddDescriptionService: [{
                        serviceName: "2 Mechones Permanentes Azul y Futcia,",
                        CostService: el.services[0].servicePrice
                    }]
                }
        }

        this._getAppointment.StartStopAppointmentFun(url, body)
            .subscribe(
                (response) => {
                    this._snackBar.open(`Servicio ${type==1 ? 'iniciado' : 'finalizado'} exitosamente!!!`, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    if(type==2){
                        this.GetCitas(1);
                    }
                },
                (response) => {



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

@Component({
    selector: 'update-appoint-dialog',
    templateUrl: './update-appoint-dialog.html',
})
export class UpdateAppointmentDialogBox {
    @ViewChild('updateNgForm') signUpNgForm: NgForm;
    updateForm: FormGroup;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    constructor(
        public dialogRef: MatDialogRef<UpdateAppointmentDialogBox>,
        private _getAppointment: AppointmentsService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

     /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.updateForm = this._formBuilder.group({
                dateini: ['', Validators.required],
                datefin: ['', Validators.required]
            }
        );
    }

    /**
     * Register
     */
    Updaterow(): void
    {
        // Do nothing if the form is invalid
        if ( this.updateForm.invalid )
        {
            return;
        }

        // Disable the form
        this.updateForm.disable();

        // Hide the alert
        this.showAlert = false;
        const body = this.updateForm.getRawValue();
        var dias = 1;
        body.dateini = new Date(new Date(body.dateini).setDate( new Date(body.dateini).getDate() + dias)).toLocaleDateString()
        body.datefin = new Date(new Date(body.datefin).setDate( new Date(body.datefin).getDate() + dias)).toLocaleDateString()
        body.business = Business.business.business;
        // Sign up
        this._getAppointment.updateAppointmentFun(body)
            .subscribe(
                (response) => {
                    this._snackBar.open('Cita actualizada exitosamente!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.dialogRef.close(true);
                },
                (response) => {

                    // Re-enable the form
                    this.updateForm.enable();

                    // Reset the form
                    this.updateForm.reset();

                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    close(){
        this.dialogRef.close(true);
    }

    CloseAppointment(){
        const body = {
            appointmentID: Business._id
        }
        this._getAppointment.deleteAppointmentFun(body)
            .subscribe(
                (response) => {
                    this._snackBar.open('Cita eliminada exitosamente!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.dialogRef.close(true);
                },
                (response) => {

                    // Re-enable the form
                    this.updateForm.enable();

                    // Reset the form
                    this.updateForm.reset();

                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

}


@NgModule({
  declarations: [UpdateAppointmentDialogBox],
  exports: [UpdateAppointmentDialogBox],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ],
})
export class ZippyModule {}


@Component({
    selector: 'create-appoint-dialog',
    templateUrl: './create-appoint-dialog.html',
})
export class CreateAppointmentDialogBox {
    @ViewChild('updateNgForm') signUpNgForm: NgForm;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    nameCli = new FormControl('');
    filteredOptions: Observable<string[]>;
    updateForm: FormGroup;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    typeServicesSelected: any[]  = [];
    tipoDeServicio: any[];
    collaborators: any[] = [{id:1, coll:'Pablo'}, {id:2, coll:'Pedro'}, {id:3, coll:'Juan'}, {id:4, coll:'Santiago'}];
    ServicioCabello: string[] = ['Corte', 'lavado', 'aliser'];
    ServiciosPeinados: string[] = ['Blower', 'Peinado con crespos'];
    ServiciosTinturas: string[] = ['Color', 'Matices Canas'];
    ServicioBarb: string[] = ['Afeitar', 'diseño'];
    name: any;
    emailClient:string
    user: any;
    horarioDisponible:string[] = [];
    constructor(
        public dialogRef: MatDialogRef<UpdateAppointmentDialogBox>,
        private _getAppointment: AppointmentsService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _userService: UserService,
        private authService: AuthService
    ) {}

     /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.updateForm = this._formBuilder.group({
                user: [''],
                discount:[''],
                business: [''],
                tradename: [''],
                manager: [''],
                observationManager: [''],
                staff: ['', Validators.required],
                typeServices: ['', Validators.required],
                services: ['', Validators.required],
                dateService: ['', Validators.required],
                timeService: ['', Validators.required]
            }
        );
        this.updateForm.get('typeServices')?.disable();
        this.authService.InfoUserApi().subscribe((data:any)=> {
          });
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: any) => {
                this.user = user;

            });
            this.GetServices();
             this.GetCollaborators();
    }

    GetHoursCollaborator(){
        const body = {
            business:this.user.business.business,
            tradename:this.user.business.branchOffices[0].tradeName,
            staff:this.updateForm.get('staff')?.value,
            dateService:moment(this.updateForm.get('dateService')?.value).format('DD/MM/YYYY')
        };
        this._getAppointment.gethoursCollaborator('apu/horact', body).subscribe((hours:any) => {
            this.horarioDisponible = hours.msg;
            });
    }

    GetServices(){
        this._getAppointment.getData('sv/allse').subscribe((coll:any) => {
            this.tipoDeServicio = coll.msg;
            });
    }

    GetCollaborators(){
        const body = {
            nitBusiness:this.user.business.nit
        }
        this._getAppointment.getCollaborator('sf/allco', body).subscribe((coll:any) => {
            this.collaborators = coll.msg.filter((el:any) => el.TypeCollaborator[0].name !== "Administrador(a)")
            });
    }

    GetTypeServices(id:any){
        const body = {
            serviceID:id
        }
        this._getAppointment.getTypeServices('tsv/tsxserid', body).subscribe((type:any) => {
            this.typeServicesSelected = type.msg;
            });
    }


    /**
     * create
     */
    CreateAppiment(): void
    {
        // Do nothing if the form is invalid
        if ( this.updateForm.invalid )
        {
            return;
        }

        // Disable the form
        this.updateForm.disable();

        // Hide the alert
        this.showAlert = false;
        const body = this.updateForm.getRawValue();
        body.user = this.name.uid;
        body.manager =  this.user.staff.id;
        body.business = this.user.business.business
        body.tradename = this.user.business.branchOffices[0].tradeName;
        console.log(body)
        this._getAppointment.CreateAppointmentFun(body)
            .subscribe(
                (response) => {
                    this._snackBar.open('Agendamiento creado!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.dialogRef.close(true);
                },
                (response) => {
                    this._snackBar.open(response.error.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    // Re-enable the form
                    this.updateForm.enable();

                    // Reset the form
                    // this.updateForm.reset();

                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    searchUser(e:any){

        const body = {
            emailUser:e
        }
        this._getAppointment.getClients('usr/usem', body).subscribe((user:any) => {
            this.name = user.msg;
            if(typeof this.name === "object"){
                this._snackBar.open('Usuario encontrado!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                        panelClass: ['greenClass']
                    });
            } else {
                this._snackBar.open('Usuario no encontrado, digite un correo completo y válido!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
            }
        });


        /* console.log(e)
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        this.name = 'Caleb Saenz';

        this.updateForm.get('user')?.setValue(138739083930) */
    }

    /* private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
      } */

    close(){
        this.dialogRef.close(true);
    }


    tipeSelected(e:any){
        console.log(this.updateForm.get('services')?.value)
        this.GetTypeServices(this.updateForm.get('services')?.value);
        this.updateForm.get('typeServices')?.enable()
    }

}

@NgModule({
  declarations: [CreateAppointmentDialogBox],
  exports: [CreateAppointmentDialogBox],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    NgApexchartsModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatSlideToggleModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
})
export class CreateModule {}
