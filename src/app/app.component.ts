import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from './shared/services/customizer-settings.service';
import { ToggleService } from './shared/services/toggle.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    // TODO: Se debe configurar para que miestras no se halla hecho login el Sidebar no aparezca y la hamburgusa del header este oculta tambien

    title = 'Kalos Servicio de Administracion';

    isToggled = false;

    constructor(
        public router: Router,
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
