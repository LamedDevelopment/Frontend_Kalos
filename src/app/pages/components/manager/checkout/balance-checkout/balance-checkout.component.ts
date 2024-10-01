import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-balance-checkout',
    templateUrl: './balance-checkout.component.html',
    styleUrls: ['./balance-checkout.component.scss']
})
export class BalanceCheckoutComponent {
    //

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
        this.getInfoDia()
    }

    getInfoDia() {
        // total del dia: totalSales

        this.managerservice.getSalesofDay().subscribe(
            (response) => {


                this.data = response.msg.DetallesVentas;
                this.dataSource = new MatTableDataSource<any>(this.data);
                // this.dataSource.paginator = this.paginator;
                // this.totalVentas = response.msg.TotalVentas;
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
