import { DatePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceHttp } from 'src/app/pages/services/api.service';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { ServicesService } from 'src/app/pages/services/services.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import { CustomizerSettingsService } from '../../services/customizer-settings.service';
import { ToggleService } from '../../services/toggle.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    isSticky: boolean = false;
    user: any;
    userImage: string = 'https://bellezaap.com/busdocu/802127585/img_avatars/kalos_general.png';  // Imagen por defecto
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    tokenUser: any;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private _userService: UserService,
        private authService: AuthService,
        private apiservice: ApiServiceHttp,
        private router: Router,
        private _userToken: ServicesService
    ) {
        this.toggleService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this._userToken.InfoUserApi().subscribe((data:any) => {
            console.log('Datos de Imagen: ', data.msg.staff.img);
            this.tokenUser = data.msg.staff.img || this.userImage;
        });
        this.authService.InfoUserApi().subscribe((data: any) => {});
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user.user ? user.user : user;
                // Si el usuario tiene una imagen específica, se actualiza la variable `userImage`
                console.log('Datos del Usuario: ', this.user.img)
                console.log('Datos del Usuario Default: ', this.userImage)
                if (this.user?.img) {
                    this.tokenUser = this.user.img || this.userImage;
                }
            });
    }

    toggleTheme() {
        this.themeService.toggleTheme();
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

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(
        this.currentDate,
        'dd MMMM yyyy'
    );

    logOut() {
        this.apiservice.get('login/close', {}).subscribe(
            (res: any) => {
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['auth/login']);
            },
            (error: any) => {
                console.log('error al cerrar sesión', error);
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['auth/login']);
            }
        );
    }
}
