import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import * as moment from 'moment';

@Component({
    selector: 'app-egreso-checkout',
    templateUrl: './egreso-checkout.component.html',
    styleUrls: ['./egreso-checkout.component.scss']
})
export class EgresoCheckoutComponent {
    displayedColumns: string[] = [
        'descripcion',
        'precio',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    data = [];
    dataSource = new MatTableDataSource<any>(this.data);
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 3;

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private modalservice: ModalservicesService,
        private managerservice: ManagerService
    ) { }


    ngOnInit(): void {
        this.getData()
    }

    getData() {
        let fecha = moment().format('DD/MM/YYYY');
        const dataUser = this.getDataUser();
        let body = {

            "business": {
                "business": dataUser?.business,
                "nit": dataUser?.nit,
                "nameBusiness": dataUser?.businessName,
                "tradename": dataUser?.branchOffices[0]?.tradeName
            },
            "dateOutflow": fecha
        }
        this.managerservice.getEgresos(body).subscribe(
            (response) => {
                console.log("🚀 ~ response:", response);
                // Se debe pintar descripcion y valor
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

    getDataUser() {
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        return datauser;
    }

}
