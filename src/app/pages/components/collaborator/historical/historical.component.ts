import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-historical',
    templateUrl: './historical.component.html',
    styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['servicio', 'fecha', 'comision'];
    dataSource: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private _router: Router,
        private appointmentsService: AppointmentsService
    ) {}

    ngAfterViewInit() {
        this.getHist();
    }

    getHist() {
        this.appointmentsService
            .getAppointmentHistory('apu/collahisap')
            .subscribe((bill: any) => {
                this.dataSource = new MatTableDataSource<any>(bill.msg);
                this.dataSource.paginator = this.paginator;
            });
    }
}
