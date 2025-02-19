import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalliquidacionComponent } from './modals/modalliquidacion/modalliquidacion.component';
import * as moment from 'moment';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['nombre', 'monto', 'liq'];
    dataSource1: any;
    dataSource2: any;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    range = new FormGroup({
        start: new FormControl<any | null>(null),
        end: new FormControl<any | null>(null),
    });

    constructor(
        public themeService: CustomizerSettingsService,
        private _router: Router,
        private appointmentsService: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.range.controls.start.setValue(
            new Date(new Date().setDate(new Date().getDate() - 5))
        );
        this.range.controls.end.setValue(
            new Date(new Date().setDate(new Date().getDate() + 6))
        );
    }

    ngAfterViewInit() {
        this.getHist();
    }

    getHist() {
        this.dataSource1 = new MatTableDataSource<any>([]);
        this.dataSource2 = new MatTableDataSource<any>([]);
        const dateini = moment(this.range.get('start')?.value).format(
            'DD/MM/YYYY'
        );
        const datefin = moment(this.range.get('end')?.value).format(
            'DD/MM/YYYY'
        );
        const body = {
            dateStart: dateini,
            dateEnd: datefin,
        };

        this.appointmentsService
            .gethoursCollaborator('paycom/manaaccum', body)
            .subscribe(
                (bill: any) => {
                    console.log(bill);
                    this.dataSource1 = new MatTableDataSource<any>(
                        bill?.msg?.CommColla
                    );
                    this.dataSource2 = new MatTableDataSource<any>(
                        bill?.msg?.CommBusi
                    );
                    this.dataSource1.paginator = this.paginator;
                    this.dataSource2.paginator = this.paginator;
                },
                (error) => {
                    this._snackBar.open(error.error.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                }
            );
    }

    openModalLiquidacion(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        element: any
    ) {
        const dateini = moment(this.range.get('start')?.value).format(
            'DD/MM/YYYY'
        );
        const datefin = moment(this.range.get('end')?.value).format(
            'DD/MM/YYYY'
        );
        setTimeout(() => {
            const dialogRef = this.dialog.open(ModalliquidacionComponent, {
                width: '1000px',
                enterAnimationDuration,
                exitAnimationDuration,
                data: {
                    element,
                    datastart: dateini,
                    dateEnd: datefin,
                },
            });

            dialogRef.afterClosed().subscribe((data) => {
                // Una vez cerrado el modal, puedes acceder a los datos devueltos
                console.log('Datos del modal cerrado:', data);
                this.getHist();
            });
        }, 1000);
    }
}
