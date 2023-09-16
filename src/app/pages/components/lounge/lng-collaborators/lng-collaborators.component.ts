import { Component } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-lng-collaborators',
  templateUrl: './lng-collaborators.component.html',
  styleUrls: ['./lng-collaborators.component.scss']
})
export class LngCollaboratorsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
