import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';
import { CustomizerSettingsService } from '../../services/customizer-settings.service';
import { UTILITIES_CONSTANTS } from 'src/app/utilities';
import { menu } from 'src/app/pages/models/user';
import { UserService } from 'src/app/pages/services/user/user.service';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {


    panelOpenState = false;

    isToggled = false;
    menuItems:menu[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    user: any;
    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private _userService: UserService,
        private authService: AuthService
    ) {

        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }


    /**
     * On init
     */
    ngOnInit(): void
    {
        this.authService.InfoUserApi().subscribe((data:any)=> {
          });

        const fun = this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: any) => {
                this.user = user.user ? user.user : user[0];
                console.log(this.user)
                this.menuItems = UTILITIES_CONSTANTS.plans.filter((el:any) => Object.keys(this.user).includes(el.rol));
            });
        setTimeout(() => {fun}, 500)

    }

    ngAfterViewInit() {

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
