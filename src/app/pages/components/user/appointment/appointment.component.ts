import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

export interface PeriodicElement {
    appointmentDate: Array<any>;
    appointmentStatus: string;
    business:any;
    services: Array<any>;
    user: any;
}
let Business: any;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements AfterViewInit  {

    displayedColumns: string[] = ['product', 'customer', 'price', 'vendor', 'date', 'status'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ELEMENT_DATA: PeriodicElement[];
    dataSource:any;
    pending = true;
    outOfStock = true;
    delivered = true;
    hists: Array<any>;
    search:string = '';

    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.GetCitas(1);
        this.GetHistoricoCitas();
        console.log('On init')
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    GetCitas(e:any){
        if (e==1) {
            this._getAppointment.getAppointmentDayOrWeek('apu/wuap').subscribe((appo:any) => {
                this.ELEMENT_DATA = appo.msg;
                this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                this.dataSource.filterPredicate = function(data:any, filter: string): boolean {

                      return data.services[0].nameTypeService.toString().toLowerCase().includes(filter)
                      || data.services[0].servicePrice.toString().toLowerCase().inlcides(filter)
                      || data.business.nameBusiness.toLowerCase().includes(filter)
                      || data.appointmentDate[0].dateService.toString().toLowerCase().includes(filter)
                      || data.appointmentDate[0].timeService.toString().toLowerCase().includes(filter)
                };

            });
        } else {
            this._getAppointment.getAppointmentDayOrWeek('apu/uapd').subscribe((appo:any) => {
                this.ELEMENT_DATA = appo.msg;
                this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                this.dataSource.filterPredicate = function(data:any, filter: string): boolean {

                      return data.services[0].nameTypeService.toString().toLowerCase().includes(filter)
                      || data.services[0].servicePrice.toString().toLowerCase().inlcides(filter)
                      || data.business.nameBusiness.toLowerCase().includes(filter)
                      || data.appointmentDate[0].dateService.toString().toLowerCase().includes(filter)
                      || data.appointmentDate[0].timeService.toString().toLowerCase().includes(filter)
                };
            });
        }
    }

    GetHistoricoCitas(){
            this._getAppointment.getAppointmentHistory('apu/hisuap').subscribe((hist:any) => {
                this.hists =  hist.msg;
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log(filterValue, this.dataSource)
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openCreateUserDialog(enterAnimationDuration: string, exitAnimationDuration: string, bs:any): void {
        Business = bs;

        this.dialog.open(UpdateAppointmentDialogBox, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration
        }).afterClosed().subscribe(
            data => {
                this.ngOnInit();

            }
        );
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}

@Component({
    selector: 'update-appoint-dialog',
    templateUrl: './update-appoint-dialog.html',
})
export class UpdateAppointmentDialogBox {
    @ViewChild('updateNgForm') signUpNgForm: NgForm;
    updateForm: FormGroup;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    constructor(
        public dialogRef: MatDialogRef<UpdateAppointmentDialogBox>,
        private _getAppointment: AppointmentsService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

     /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.updateForm = this._formBuilder.group({
                dateini: ['', Validators.required],
                datefin: ['', Validators.required]
            }
        );
    }

    /**
     * Register
     */
    Updaterow(): void
    {
        // Do nothing if the form is invalid
        if ( this.updateForm.invalid )
        {
            return;
        }

        // Disable the form
        this.updateForm.disable();

        // Hide the alert
        this.showAlert = false;
        const body = this.updateForm.getRawValue();
        var dias = 1;
        body.dateini = new Date(new Date(body.dateini).setDate( new Date(body.dateini).getDate() + dias)).toLocaleDateString()
        body.datefin = new Date(new Date(body.datefin).setDate( new Date(body.datefin).getDate() + dias)).toLocaleDateString()
        body.business = Business.business.business;
        // Sign up
        this._getAppointment.updateAppointment(body)
            .subscribe(
                (response) => {
                    this._snackBar.open('Cita actualizada exitosamente!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.dialogRef.close(true);
                },
                (response) => {

                    // Re-enable the form
                    this.updateForm.enable();

                    // Reset the form
                    this.updateForm.reset();

                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    close(){
        this.dialogRef.close(true);
    }

    CloseAppointment(){
        console.log(Business._id)
        const body = {
            appointmentID: Business._id
        }
        this._getAppointment.deleteAppointment(body)
            .subscribe(
                (response) => {
                    this._snackBar.open('Cita eliminada exitosamente!!!', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                    this.dialogRef.close(true);
                },
                (response) => {

                    // Re-enable the form
                    this.updateForm.enable();

                    // Reset the form
                    this.updateForm.reset();

                    // Set the alert


                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

}

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@NgModule({
  declarations: [UpdateAppointmentDialogBox],
  exports: [UpdateAppointmentDialogBox],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ZippyModule {}
