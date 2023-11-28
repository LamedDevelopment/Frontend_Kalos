import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    selectColl(user:any){
        this.setColaboratorSelected.emit(user)
    }

    ServicioFilter(serv:any){
        console.log(serv)
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
