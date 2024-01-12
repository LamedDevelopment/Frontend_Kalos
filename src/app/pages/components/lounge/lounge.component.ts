import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { AppointmentsService } from '../../services/user/appointments.service';
import { MatDialog } from '@angular/material/dialog';
import { LoungService } from '../../services/user/loung.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lounge',
  templateUrl: './lounge.component.html',
  styleUrls: ['./lounge.component.scss']
})
export class LoungeComponent implements AfterViewInit, OnInit {
    loungeSelected: boolean = false;
    Business:any[] = [];
    nameLoung: any;
    collSelected: any;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    colaboradores:any[] = [];
    Servicios:any[] = [];
    TypeServicios:any[] = [];
    businessSelected: any;
    ServiceSelected: any;
    constructor(
        public themeService: CustomizerSettingsService,
        private _getAppointment: AppointmentsService,
        public dialog: MatDialog,
        public _loungService: LoungService,
        private _snackBar: MatSnackBar
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getBusiness();
    }

    ngAfterViewInit(){

    }


    SelectLounge(el:any){
        this.loungeSelected = true;
        this.businessSelected = el;
        this.nameLoung = el.branchoffices[0].businessName;
        this.colaboradores = el.branchoffices[0].collaborators
        this.getServices();
        console.log(el)
    }

    ColaboratorSeledted(e:any){
        this.collSelected = e;
        this.TypeServicios = e.typeService;
        console.log(this.collSelected)
    }

    setServicioSelected(e:any){
        this.ServiceSelected = e;
    }

    getBusiness(){
        this._loungService.getBusiness('bus/allbus').subscribe(
                (response) => {
                    console.log(response);
                    this.Business = response.msg;
                },
                (response) => {
                    this.showAlert = true;
                }
            );
    }

    getServices(){
        this._loungService.getServices('sv/allse').subscribe(
                (response) => {
                    console.log(response);
                    this.Servicios = response.msg;
                },
                (response) => {
                    this.showAlert = true;
                }
            );
    }

    goBack(){
        this.loungeSelected = false;
        this.collSelected = [];
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
