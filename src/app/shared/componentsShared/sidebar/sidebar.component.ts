import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceHttp } from 'src/app/pages/services/api.service';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import { CustomizerSettingsService } from '../../services/customizer-settings.service';
import { ToggleService } from '../../services/toggle.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
    panelOpenState = false;

    isToggled = false;
    menuItems: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    user: any;
    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private _userService: UserService,
        private authService: AuthService,
        private apiservice: ApiServiceHttp
    ) {
        this.toggleService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.authService.InfoUserApi().subscribe((data: any) => {});

        const fun = this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {

                this.user = user.user ? user.user : user;
                const role = this.user.role
                    ? this.user.role
                    : this.user.staff.profile;
                /* this.menuItems = UTILITIES_CONSTANTS.plans.filter(
                    (el: any) => role === el.rol
                ); */
            });
        setTimeout(() => {
            fun;
        }, 500);

        this.getDataMenu();
    }

    ngAfterViewInit() {}

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    getDataMenu() {
        try {
            this.apiservice.get('mn', {}).subscribe(
                (res: any) => {
                    this.menuItems = res.msg.menu;
                },
                (error: any) => {
                    console.log('error al consultar', error);
                }
            );
        } catch (error) {
            console.log('error en el menu', error);
        }
    }
}
