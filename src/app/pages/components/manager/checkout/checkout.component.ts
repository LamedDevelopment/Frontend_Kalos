import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
    displayedColumns: string[] = [
        'item',
        'servicio',
        'cliente',
        'precio',
        'colaborador',
    ];

    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    data = [];
    dataSource = new MatTableDataSource<any>(this.data);
    totalVentas: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private modalservice: ModalservicesService,
        private managerservice: ManagerService
    ) {}

    ngOnInit(): void {
        this.getOrdenes();
    }

    getOrdenes() {
        this.managerservice.getSalesofDay().subscribe(
            (response) => {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                this.data = response.msg.DetallesVentas;
                this.dataSource = new MatTableDataSource<any>(this.data);
                this.dataSource.paginator = this.paginator;

                this.totalVentas = response.msg.TotalVentas;
            },
            (error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
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
}
