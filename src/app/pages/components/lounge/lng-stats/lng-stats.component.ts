import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-lng-stats',
    templateUrl: './lng-stats.component.html',
    styleUrls: ['./lng-stats.component.scss'],
})
export class LngStatsComponent {
    @Input()
    services: any;
    @Output() serviceSelected = new EventEmitter<any>();

    service = '';

    constructor(public themeService: CustomizerSettingsService) {}

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    selectedService(service: any) {
        console.log('====================================');
        console.log(service);
        console.log('====================================');
        this.service = service.name;
        this.serviceSelected.emit(service);
    }
}
