import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseApi } from 'src/app/pages/common/Interfaces/Response';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ConfigTurnosComponent } from '../modals/config-turnos/config-turnos.component';
import { GeneratePermisosComponent } from '../modals/generate-permisos/generate-permisos.component';
import { ModalSuppliesComponent } from '../modals/modal-supplies/modal-supplies.component';

@Component({
    selector: 'app-seesuplies',
    templateUrl: './seesuplies.component.html',
    styleUrls: ['./seesuplies.component.scss'],
})
export class SeesupliesComponent {
    displayedColumns: string[] = ['Colaborador', 'Editar'];

    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data: any = [];
    dataSource = new MatTableDataSource<any>(this.data);
    totalVentas: any;
    panelOpenState = false;
    buttonEdit = false;
    buttonAdd = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private modalservice: ModalservicesService,
        private managerservice: ManagerService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.managerservice.getSupplies().subscribe(
            (response: ResponseApi) => {
                this.data = response.msg;
                this.dataSource = new MatTableDataSource<any>(this.data);
                this.dataSource.paginator = this.paginator;
            },
            (error) => {
                this._snackBar.open(
                    error.error.msg
                        ? error.error.msg
                        : 'Error Al consultar información',
                    '',
                    {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    }
                );
            }
        );
    }

    openModalseeSupplies(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        data: any
    ) {
        this.buttonEdit = true;
        console.log(data);

        setTimeout(() => {
            const dialogRef = this.dialog.open(ModalSuppliesComponent, {
                width: '1000px',
                enterAnimationDuration,
                exitAnimationDuration,
                data: { data, supplies: data.supplies },
            });

            dialogRef.afterClosed().subscribe((data) => {
                this.buttonEdit = false;

                this.getData();
            });
        }, 1000);
    }
}
