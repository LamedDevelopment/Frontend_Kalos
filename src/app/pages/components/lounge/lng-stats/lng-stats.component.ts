import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-lng-stats',
  templateUrl: './lng-stats.component.html',
  styleUrls: ['./lng-stats.component.scss']
})
export class LngStatsComponent {
     @Input()
    services:any;

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
