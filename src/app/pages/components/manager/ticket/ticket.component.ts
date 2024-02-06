import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['nombre',  'monto', 'fecha'];
    dataSource: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private _router: Router,
        private appointmentsService: AppointmentsService,
        public dialog: MatDialog,
    ) {}


    ngOnInit(){

    }

    ngAfterViewInit() {
        this.getHist();
    }


    getHist() {
        this.appointmentsService
            .getAppointmentHistory('lose/hissola')
            .subscribe((bill: any) => {
                console.log(bill);
                this.dataSource = new MatTableDataSource<any>(bill.msg);
                this.dataSource.paginator = this.paginator;
            });
    }
}
