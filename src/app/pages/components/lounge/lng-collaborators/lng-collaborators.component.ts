import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-lng-collaborators',
  templateUrl: './lng-collaborators.component.html',
  styleUrls: ['./lng-collaborators.component.scss']
})
export class LngCollaboratorsComponent {
    @Input()
    colaboradores:any;
    @Input()
    servicios:any;
    @Output() setColaboratorSelected: EventEmitter<any> = new EventEmitter<any>();
    @Output() setServicioSelected: EventEmitter<any> = new EventEmitter<any>();
    servicioSelected: any;
    showAlert: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    Collaborators: any;

    constructor(
        public themeService: CustomizerSettingsService,
        private _snackBar: MatSnackBar
    ) {}

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.Collaborators = this.colaboradores.filter((col:any) => col.profile[0].code !== "MANAGER_ROLE")
    }

    selectColl(user:any){
        if(this.servicioSelected){
            this.setColaboratorSelected.emit(user);
        } else {
            this._snackBar.open('Seleccione un servicio!!!', '', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: this.durationInSeconds * 1000,
            });
        }

    }

    ServicioFilter(serv:any){
        console.log(this.colaboradores)
        this.Collaborators = this.colaboradores.filter((col:any) => col.services.some((el:any) => el.services == serv._id) && col.profile[0].code !== "MANAGER_ROLE")
        this.servicioSelected = serv;
        console.log(serv);
        this.setServicioSelected.emit(this.servicioSelected)
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
