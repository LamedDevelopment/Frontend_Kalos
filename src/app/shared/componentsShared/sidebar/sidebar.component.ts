import { Component } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';
import { CustomizerSettingsService } from '../../services/customizer-settings.service';
import { UTILITIES_CONSTANTS } from 'src/app/utilities';
import { menu } from 'src/app/pages/models/user';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


    panelOpenState = false;

    isToggled = false;
    menuItems:menu[];
    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

        this.menuItems = UTILITIES_CONSTANTS.plans
    }

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }


}
