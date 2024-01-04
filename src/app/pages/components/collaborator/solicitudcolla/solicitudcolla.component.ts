import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalservicesService } from 'src/app/pages/services/modalservices.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { LoanmodalComponent } from '../modals/loanmodal/loanmodal.component';

@Component({
    selector: 'app-solicitudcolla',
    templateUrl: './solicitudcolla.component.html',
    styleUrls: ['./solicitudcolla.component.scss'],
})
export class SolicitudcollaComponent {
    displayedColumns: string[] = ['fecha', 'comision'];
    dataSource: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private modalservice: ModalservicesService
    ) {}

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
}
