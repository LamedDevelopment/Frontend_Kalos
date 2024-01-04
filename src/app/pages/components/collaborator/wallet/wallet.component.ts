import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/pages/services/user/account.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
    displayedColumns: string[] = ['servicio', 'fecha', 'comision'];
    dataSource: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    total: any = 0;
    total_servicios = 0;

    constructor(
        public themeService: CustomizerSettingsService,
        private appointmentsService: AppointmentsService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {}

    ngAfterViewInit() {
        this.getWallet();
    }

    getWallet() {
        this.appointmentsService
            .getWallet('paycom/colla')
            .subscribe((bill: any) => {
                //console.log(bill);
                bill.msg.forEach((element: any) => {
                    console.log('element', element);
                    const fecha = new Date(
                        parseInt(
                            element.commissionPayment[0]
                                .collaboratorCommission[0].serviceDate
                        )
                    );
                    const año = fecha.getFullYear();
                    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Se suma 1 ya que en JavaScript los meses van de 0 a 11
                    const dia = ('0' + fecha.getDate()).slice(-2);
                    const fechaFormateada = `${año}-${mes}-${dia}`;
                    console.log(fechaFormateada);
                    element.commissionPayment[0].collaboratorCommission[0].serviceDate =
                        fechaFormateada;
                    this.total += Number(
                        element.commissionPayment[0].collaboratorCommission[0]
                            .commissionValue
                    );
                });
                console.log('total', this.total);
                this.total_servicios = bill.msg.length;

                this.dataSource = new MatTableDataSource<any>(bill.msg);
                this.dataSource.paginator = this.paginator;
            });
    }
}
