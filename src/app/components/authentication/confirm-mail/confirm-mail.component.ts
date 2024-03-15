import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';


@Component({
    selector: 'app-confirm-mail',
    templateUrl: './confirm-mail.component.html',
    styleUrls: ['./confirm-mail.component.scss']
})
export class ConfirmMailComponent {
    orderObj: any;
    activeView: boolean = false;
    msm: string;
    error: boolean;

    constructor(
        public themeService: CustomizerSettingsService,
        private route: ActivatedRoute,
        private _authService: AuthService,
    ) {}

    /**
     * On init
     */
    async ngOnInit() {
        this.route.queryParamMap.subscribe((params:any) => {
            this.orderObj = { ...params.keys, ...params };

            if(this.orderObj[0]=== 'token'){
                this._authService.ActiveUser(this.orderObj.params.token)
                .subscribe((response:any) => {
                    if(response.ok == true){
                        this.activeView = true;
                    } else {
                        this.activeView = true;
                        this.error = true;
                        this.msm = response.msg;
                    }
                })
            }
        })
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

}
