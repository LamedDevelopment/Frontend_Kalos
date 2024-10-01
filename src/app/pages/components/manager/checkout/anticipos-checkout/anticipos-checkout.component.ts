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
    selector: 'app-anticipos-checkout',
    templateUrl: './anticipos-checkout.component.html',
    styleUrls: ['./anticipos-checkout.component.scss']
})
export class AnticiposCheckoutComponent {

    displayedColumns: string[] = [
        'nombre',
        'documento',
        "typeservice",
        "servicePrice",
        "advancePayment"
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

        const dataUser = this.getDataUser();
        let body = {

            "business": {
                "business": dataUser?.business,
                "nit": dataUser?.nit,
                "nameBusiness": dataUser?.businessName,
                "tradename": dataUser?.branchOffices[0]?.tradeName
            },

        }
        this.managerservice.getAnticipos(body).subscribe(
            (response) => {
                // se debe pintar nombre apellido de usuario concatenado,userDocu, nameTypeService,servicePrice,advancePayment
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
