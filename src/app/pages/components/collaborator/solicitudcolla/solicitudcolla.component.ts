import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { LoanmodalComponent } from '../modals/loanmodal/loanmodal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-solicitudcolla',
    templateUrl: './solicitudcolla.component.html',
    styleUrls: ['./solicitudcolla.component.scss'],
})
export class SolicitudcollaComponent {
    displayedColumns: string[] = ['monto', 'plazo', 'status', 'fecha'];
    dataSource: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        public themeService: CustomizerSettingsService,
        private appointmentsService: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private modalservice: ModalservicesService
    ) {}
    ngOnInit(): void {
        this.getLoans();
    }

    openModal(enterAnimationDuration: string, exitAnimationDuration: string) {
        this.dialog
            .open(LoanmodalComponent, {
                width: '1000px',
                enterAnimationDuration,
                exitAnimationDuration,
            })
            .afterClosed()
            .subscribe((data) => {
                // una vez cerrado el modal se refresca la data
            });
    }

    getLoans() {
        this.appointmentsService.getService().subscribe((res: any) => {
            console.log(res);
            this.dataSource = new MatTableDataSource<any>(res.msg);
            this.dataSource.paginator = this.paginator;
        });
    }
}
