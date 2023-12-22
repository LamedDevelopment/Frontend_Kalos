import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { AccountService } from 'src/app/pages/services/user/account.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class InvoiceListComponent implements AfterViewInit {

    displayedColumns: string[] = ['negocio', 'servicio', 'others', 'valorOtros', 'subtotal', 'total'];
    dataSource:any;

    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(
        public themeService: CustomizerSettingsService,
        private _accountService: AccountService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private appointmentsService:AppointmentsService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {

    }

    ngAfterViewInit() {
        this.getWallet()
    }

    getWallet(){
        this.appointmentsService.getWallet('bill/user').subscribe((bill:any) => {
            console.log(bill)
            this.dataSource = new MatTableDataSource<any>(bill.msg);
            this.dataSource.paginator = this.paginator;
        })
    }



}
