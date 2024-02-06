import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ticketsModalComponent } from '../modals/ticketsModal/ticketsModal.component';



@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['nombre',  'monto', 'fecha', 'pay'];
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

    openModal(enterAnimationDuration: string, exitAnimationDuration: string, element:any) {
        const dialogConfig = new MatDialogConfig();

        // Evitar que se cierre al hacer clic fuera del modal
        dialogConfig.disableClose = true;
        dialogConfig.width = '1000px';
        dialogConfig.enterAnimationDuration = enterAnimationDuration;
        dialogConfig.exitAnimationDuration = exitAnimationDuration;

        dialogConfig.data = element;

        this.dialog
            .open(ticketsModalComponent, dialogConfig)
            .afterClosed()
            .subscribe((data) => {
                // una vez cerrado el modal se refresca la data
                this.getHist();
            });
    }


    getHist() {
        this.appointmentsService
            .getAppointmentHistory('lose/sola')
            .subscribe((bill: any) => {
                console.log(bill);
                this.dataSource = new MatTableDataSource<any>(bill.msg);
                this.dataSource.paginator = this.paginator;
            });
    }
}
