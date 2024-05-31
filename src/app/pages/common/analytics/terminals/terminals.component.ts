import { Component } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-terminals',
    templateUrl: './terminals.component.html',
    styleUrls: ['./terminals.component.scss'],
})
export class TerminalsComponent {
    constructor(public themeService: CustomizerSettingsService) {}

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
