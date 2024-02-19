import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['nombre',  'monto'];
    dataSource1: any;
    dataSource2: any;
    range = new FormGroup({
        start: new FormControl<any | null>(null),
        end: new FormControl<any | null>(null),
      });

    constructor(
        public themeService: CustomizerSettingsService,
        private _router: Router,
        private appointmentsService: AppointmentsService,
        public dialog: MatDialog,
    ) {}


    ngOnInit(){
        this.range.controls.start.setValue(new Date(new Date().setDate(new Date().getDate() - 15)))
        this.range.controls.end.setValue(new Date(new Date().setDate(new Date().getDate())))

    }

    ngAfterViewInit() {
        this.getHist();
    }


    getHist() {
        this.dataSource1 = new MatTableDataSource<any>([]);
        this.dataSource2 = new MatTableDataSource<any>([]);
        const body = {
            dateStart: new Date(this.range.getRawValue().start).toLocaleDateString(),
            dateEnd: new Date(this.range.getRawValue().end).toLocaleDateString()
        }
        this.appointmentsService
            .gethoursCollaborator('paycom/manaaccum', body)
            .subscribe((bill: any) => {
                console.log(bill);
                this.dataSource1 = new MatTableDataSource<any>(bill?.msg?.CommColla);
                this.dataSource2 = new MatTableDataSource<any>(bill?.msg?.CommBusi);
                this.dataSource1.paginator = this.paginator;
                this.dataSource2.paginator = this.paginator;
            });
    }

}
