import { Component } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-analytics-stats',
    templateUrl: './analytics-stats.component.html',
    styleUrls: ['./analytics-stats.component.scss'],
})
export class AnalyticsStatsComponent {
    constructor(public themeService: CustomizerSettingsService) {}

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
