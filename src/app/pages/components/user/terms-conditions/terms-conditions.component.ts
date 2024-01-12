import { Component } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-terms-conditions',
    templateUrl: './terms-conditions.component.html',
    styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
