import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ModalappoforaComponent } from 'src/app/pages/common/modalappofora/modalappofora.component';
import { ModalappomanagerComponent } from 'src/app/pages/common/modalappomanager/modalappomanager.component';
import { ModalHistoricoServiciosComponent } from 'src/app/pages/common/modals/modal-historico-servicios/modal-historico-servicios.component';
import { ModalReasignacionComponent } from 'src/app/pages/common/modals/modal-reasignacion/modal-modal-reasignacion.component';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import {
    PeriodicElement,
    UpdateAppointmentDialogBox,
} from '../../business/appo/appo.component';
import { CloseserviceComponent } from '../../collaborator/modals/closeservice/closeservice.component';
import { ModalserviceComponent } from '../../collaborator/modals/modalservice/modalservice.component';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
    displayedColumns: string[] = [
        'product',
        'namecolla',
        'delete',
        //'add',
        'expand',
        'start',
    ];

    displayedColumnsExpan: string[] = [];

    columsview: string[] = [];

    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ELEMENT_DATA: any[];
    expandedElement: any | null;
    dataSource: any;
    pending = true;
    outOfStock = true;
    delivered = true;
    hists: Array<any>;
    search: string = '';

    startStop: boolean = true;
    Business: any;
    branchoffices: any = [];
    id_: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private modalservice: ModalservicesService,
        private managerservice: ManagerService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this.columsview = this.displayedColumns;
        this.GetCitas(1);
        this.GetHistoricoCitas();
        this.getBusiness();
    }

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
    }

    GetCitas(e: any) {
        if (e == 1) {
            this._getAppointment
                .getAppointmentDayOrWeek('apu/wuapma')
                .subscribe((appo: any) => {
                    console.log('citas semana', appo.msg);

                    this.columsview = this.displayedColumns;

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
                .getAppointmentDayOrWeek('apu/uapdma')
                .subscribe((appo: any) => {
                    console.log('citas dia', appo.msg);

                    this.ELEMENT_DATA = appo.msg;
                    this.columsview = [];
                    this.columsview = this.displayedColumns;
                    console.log('columns view', this.columsview);

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
        /* Business = bs;
        console.log(Business); */
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
        //console.log(Business);
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

    openModalStartService(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        bs: any
    ): void {
        this.Business = bs;
        console.log(this.Business);
        this.modalservice.setBusinessData(this.Business);

        this.dialog
            .open(ModalserviceComponent, {
                width: '1000px',
                enterAnimationDuration,
                exitAnimationDuration,
            })
            .afterClosed()
            .subscribe((data) => {
                // una vez cerrado el modal se refresca la data
                this.GetCitas(1);
                this.GetHistoricoCitas();
            });
    }

    openModalCloseService(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        bs: any
    ): void {
        this.Business = bs;
        this.modalservice.setBusinessData(this.Business);

        this.dialog
            .open(CloseserviceComponent, {
                width: '1000px',
                enterAnimationDuration,
                exitAnimationDuration,
            })
            .afterClosed()
            .subscribe((data) => {
                // una vez cerrado el modal se refresca la data
                this.GetCitas(1);
                this.GetHistoricoCitas();
            });
    }

    createAppoFora(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ) {
        setTimeout(() => {
            const dialogRef = this.dialog.open(ModalappoforaComponent, {
                width: '1000px',
                enterAnimationDuration,
                exitAnimationDuration,
                data: {
                    _id: this.id_,
                    branchoffices: this.branchoffices, // enviar sedes al modal
                },
            });

            dialogRef.afterClosed().subscribe((data) => {
                // Una vez cerrado el modal, puedes acceder a los datos devueltos
                if (data) {
                    console.log('Datos del modal cerrado:', data);
                }

                // Una vez cerrado el modal se refresca la data
                this.GetCitas(1);
                this.GetHistoricoCitas();
            });
        }, 1000);
    }

    createAppoByEmail(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ) {
        setTimeout(() => {
            const dialogRef = this.dialog.open(ModalappomanagerComponent, {
                width: '1000px',
                enterAnimationDuration,
                exitAnimationDuration,
                data: {
                    _id: this.id_,
                    branchoffices: this.branchoffices, // enviar sedes al modal
                },
            });

            dialogRef.afterClosed().subscribe((data) => {
                // Una vez cerrado el modal, puedes acceder a los datos devueltos
                if (data) {
                    console.log('Datos del modal cerrado:', data);
                }

                // Una vez cerrado el modal se refresca la data
                this.GetCitas(1);
                this.GetHistoricoCitas();
            });
        }, 1000);
    }

    viewHistorico(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        user_id: string
    ) {
        setTimeout(() => {
            console.log('====================================');
            console.log(user_id);
            console.log('====================================');
            const dialogRef = this.dialog.open(
                ModalHistoricoServiciosComponent,
                {
                    width: '1000px',
                    enterAnimationDuration,
                    exitAnimationDuration,

                    data: {
                        user_id,
                    },
                }
            );

            dialogRef.afterClosed().subscribe((data) => {
                // Una vez cerrado el modal, puedes acceder a los datos devueltos
                if (data) {
                    console.log('Datos del modal cerrado:', data);
                }

                // Una vez cerrado el modal se refresca la data
                this.GetCitas(1);
                this.GetHistoricoCitas();
            });
        }, 1000);
    }

    viewColaboradores(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        element: any,
        service: any
    ){
        const dialogRef = this.dialog.open(
                ModalReasignacionComponent,
                {
                    width: '1000px',
                    enterAnimationDuration,
                    exitAnimationDuration,

                    data: {
                        element,
                        service
                    },
                }
            );

            dialogRef.afterClosed().subscribe((data) => {
                // Una vez cerrado el modal, puedes acceder a los datos devueltos
                if (data) {
                    console.log('Datos del modal cerrado:', data);
                }

                // Una vez cerrado el modal se refresca la data
                this.GetCitas(1);
                this.GetHistoricoCitas();
            });
    }

    /** Metodo que obtiene las sedes del manager */
    getBusiness() {
        this.managerservice.getBusiness().subscribe((response: any) => {
            console.log('res', response);
            this.id_ = response.msg._id;
            this.branchoffices = response.msg.branchoffices;
        });
    }
}
