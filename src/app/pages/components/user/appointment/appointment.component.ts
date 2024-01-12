import {
    AfterViewInit,
    Component,
    NgModule,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarModule,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEditorModule } from 'ngx-editor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/pages/services/user/user.service';
import { LoungService } from 'src/app/pages/services/user/loung.service';
import moment from 'moment';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
export interface PeriodicElement {
    appointmentDate: Array<any>;
    appointmentStatus: string;
    business: any;
    Peluqueria: any;
    Estado: any;
    services: Array<any>;
    user: any;
}
let Business: any;

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss'],
    //   animations: [
    //     trigger('detailExpand', [
    //       state('collapsed', style({height: '0px', minHeight: '0'})),
    //       state('expanded', style({height: '*'})),
    //       transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    //     ]),
    //   ],
})
export class AppointmentComponent implements AfterViewInit {
    displayedColumns: string[] = [
        'product',
        'customer',
        'price',
        'date',
        'status',
    ]; //'vendor',

    displayedColumnsExpan: string[] = ['Peluqueria', 'Estado'];
    columnsToDisplayWithExpand: string[] = [
        ...this.displayedColumnsExpan,
        'delete',
        'add',
        'expand',
    ];
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ELEMENT_DATA: PeriodicElement[];
    expandedElement: PeriodicElement | null;
    dataSource: any;
    pending = true;
    outOfStock = true;
    delivered = true;
    hists: Array<any>;
    search: string = '';

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this.GetCitas(1);
        this.GetHistoricoCitas();
    }

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
    }

    GetCitas(e: any) {
        if (e == 1) {
            this._getAppointment
                .getAppointmentDayOrWeek('apu/wuap')
                .subscribe((appo: any) => {
                    this.ELEMENT_DATA = appo.msg;
                    this.ELEMENT_DATA.map((el: any) => {
                        el.Peluqueria = el.business.nameBusiness;
                        el.Estado = el.appointmentStatus;
                    });
                    this.dataSource = new MatTableDataSource<PeriodicElement>(
                        this.ELEMENT_DATA
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.filterPredicate = function (
                        data: any,
                        filter: string
                    ): boolean {
                        return (
                            data.services[0].nameTypeService
                                .toString()
                                .toLowerCase()
                                .includes(filter) ||
                            data.services[0].servicePrice
                                .toString()
                                .toLowerCase()
                                .inlcides(filter) ||
                            data.business.nameBusiness
                                .toLowerCase()
                                .includes(filter) ||
                            data.appointmentDate[0].dateService
                                .toString()
                                .toLowerCase()
                                .includes(filter) ||
                            data.appointmentDate[0].timeService
                                .toString()
                                .toLowerCase()
                                .includes(filter)
                        );
                    };
                });
        } else {
            this._getAppointment
                .getAppointmentDayOrWeek('apu/uapd')
                .subscribe((appo: any) => {
                    this.ELEMENT_DATA = appo.msg;
                    this.columnsToDisplayWithExpand = [
                        ...this.displayedColumns,
                        'expand',
                    ];
                    this.dataSource = new MatTableDataSource<PeriodicElement>(
                        this.ELEMENT_DATA
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.filterPredicate = function (
                        data: any,
                        filter: string
                    ): boolean {
                        return (
                            data.services[0].nameTypeService
                                .toString()
                                .toLowerCase()
                                .includes(filter) ||
                            data.services[0].servicePrice
                                .toString()
                                .toLowerCase()
                                .inlcides(filter) ||
                            data.business.nameBusiness
                                .toLowerCase()
                                .includes(filter) ||
                            data.appointmentDate[0].dateService
                                .toString()
                                .toLowerCase()
                                .includes(filter) ||
                            data.appointmentDate[0].timeService
                                .toString()
                                .toLowerCase()
                                .includes(filter)
                        );
                    };
                });
        }
    }

    GetHistoricoCitas() {
        this._getAppointment
            .getAppointmentHistory('apu/hisuap')
            .subscribe((hist: any) => {
                this.hists = hist.msg;
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log(filterValue, this.dataSource);
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openCreateUserDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        bs: any
    ): void {
        Business = bs;
        console.log(Business);
        this.dialog
            .open(UpdateAppointmentDialogBox, {
                width: '600px',
                enterAnimationDuration,
                exitAnimationDuration,
            })
            .afterClosed()
            .subscribe((data) => {
                this.ngOnInit();
            });
    }
    closeAppoinment(el: any) {
        const body = {
            appointmentID: el._id,
        };
        this._getAppointment.deleteCompleteAppointment(body).subscribe(
            (response) => {
                this._snackBar.open('Cita eliminada exitosamente!!!', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
                this.ngOnInit();
            },
            (response) => {
                this._snackBar.open('Error al eliminar la cita!!!', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
            }
        );
    }

    CloseAppointment(serv: any, app: any) {
        console.log(Business);
        const body = {
            appointmentID: app,
            service: serv._id,
        };
        console.log(body);
        this._getAppointment.deleteAppointment(body).subscribe(
            (response) => {
                this._snackBar.open('Servicio eliminado exitosamente!!!', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
                this.ngOnInit();
            },
            (response) => {
                this._snackBar.open('Error al eliminar el servicio!!!', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
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
export class UpdateAppointmentDialogBox implements OnInit {
    @ViewChild('updateNgForm') signUpNgForm: NgForm;
    updateForm: FormGroup;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;

    colaborador: any;
    Business: any;
    colaboradores: any;
    ServicesSelected: any;
    TypeServices: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    Hours = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
    servicios = ['Peluqueria', 'Tinte', 'Uñas', 'Alisado'];
    horarioSelected: string = '';
    DateSelected: string = '';
    appoimentAdd: Array<any> = [];
    ServiceSelected: any;
    user: any;
    openAgenadmiento: boolean = false;
    Servicios: any;
    BusinessSelected: any;
    ServicesColaborator: any;
    constructor(
        public dialogRef: MatDialogRef<UpdateAppointmentDialogBox>,
        private _getAppointment: AppointmentsService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar,
        public themeService: CustomizerSettingsService,
        public _loungService: LoungService,
        private _userService: UserService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.updateForm = this._formBuilder.group({
            services: ['', Validators.required],
            staff: ['', Validators.required],
            dateService: ['', Validators.required],
            timeService: ['', Validators.required],
            typeServices: ['', Validators.required],
        });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user.user;
                console.log(this.user);
            });
        this.getAppoinment();
        this.getServices();
        this.getBusiness();
        console.log(this.Business, this.colaborador);
    }

    SelectCollaborator() {
        this.BusinessSelected = this.Business.filter(
            (bs: any) => bs._id == Business.business.business
        );
        console.log(this.BusinessSelected);
        this.colaboradores =
            this.BusinessSelected[0].branchoffices[0].collaborators.filter(
                (col: any) =>
                    col.profile[0].code !== 'MANAGER_ROLE' &&
                    col.services.some(
                        (el: any) =>
                            el.services ==
                            this.updateForm.get('services')?.value
                    )
            );
    }

    getAppoinment() {
        this._getAppointment
            .getAppointmentDayOrWeek('apu/wuap')
            .subscribe((appo: any) => {
                console.log(appo);
            });
    }
    getHours() {
        const body = {
            business: this.BusinessSelected[0]._id,
            tradename: this.BusinessSelected[0].branchoffices[0].tradename,
            staff: this.updateForm.get('staff')?.value.user,
            dateService: moment(
                this.updateForm.get('dateService')?.value
            ).format('DD/MM/YYYY'),
        };
        this._loungService.getHours('apu/horact', body).subscribe(
            (response) => {
                this.Hours = response.msg;
            },
            (response) => {}
        );
    }

    valueChanged(e: any) {
        this.getHours();
        this.ServicesColaborator =
            this.updateForm.get('staff')?.value.typeService;
    }

    getBusiness() {
        this._loungService.getBusiness('bus/allbus').subscribe(
            (response) => {
                console.log(response);
                this.Business = response.msg;
                console.log(this.Business);
            },
            (response) => {
                this.showAlert = true;
            }
        );
    }

    getServices() {
        this._loungService.getServices('sv/allse').subscribe(
            (response) => {
                console.log(response);
                this.Servicios = response.msg;
            },
            (response) => {
                this.showAlert = true;
            }
        );
    }

    AgendarCita() {
        if (this.updateForm.invalid) {
            return;
        }

        // Disable the form
        this.updateForm.disable();

        // Hide the alert
        this.showAlert = false;
        let values = this.updateForm.value;
        const body = {
            appointmentID: Business._id,
            userForeing: {},
            user: this.user.id,
            discount: '',
            business: this.BusinessSelected[0]._id,
            tradename: this.BusinessSelected[0].branchoffices[0].tradename,
            manager: '',
            observationManager: '',
            staff: values.staff.user,
            services: values.services,
            typeServices: values.typeServices,
            dateService: moment(values.dateService).format('DD/MM/YYYY'),
            timeService: values.timeService + ':00',
        };
        this._loungService.createAppoinment('apu/addser', body).subscribe(
            (response) => {
                console.log(response);
                this._snackBar.open('Servicio añadido exitosamente!!!', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
                this.dialogRef.close(true);
            },
            (error) => {
                this._snackBar.open('error al crear el servicio!!!', '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
            }
        );
    }

    disabledButton() {
        return (
            this.horarioSelected == '' ||
            this.ServiceSelected == '' ||
            this.DateSelected == ''
        );
    }

    OpenAgendarCita() {
        this.openAgenadmiento = true;
    }

    myFilter = (d: Date | null): boolean => {
        const actDate = new Date();
        const day = d || new Date();
        // const day = (d || new Date()).getDay();
        // Prevent Saturday and Sunday from being selected.
        // day !== 0 && day !== 6 &&
        return day >= actDate;
    };

    DeleteService(el: any) {
        this.appoimentAdd = this.appoimentAdd.filter(
            (item: any) => item.id !== el.id
        );
    }

    close() {
        this.dialogRef.close(true);
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}

@NgModule({
    declarations: [UpdateAppointmentDialogBox],
    exports: [UpdateAppointmentDialogBox],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        FlexLayoutModule,
        MatMenuModule,
        MatMenuModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        NgApexchartsModule,
        MatProgressBarModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgScrollbarModule,
        FormsModule,
        FullCalendarModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        CarouselModule,
        NgxEditorModule,
        DragDropModule,
        HttpClientModule,
        CdkAccordionModule,
    ],
})
export class ZippyModule {}
