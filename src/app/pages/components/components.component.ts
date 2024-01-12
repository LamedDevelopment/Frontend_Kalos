import { Component } from '@angular/core';
import { ToggleService } from '../../shared/services/toggle.service';
import { CustomizerSettingsService } from '../../shared/services/customizer-settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent {

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
