import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';


@Component({
    selector: 'app-cancelar-cita',
    templateUrl: './cancelar-cita.component.html',
    styleUrls: ['./cancelar-cita.component.scss']
})
export class CancelarCitaComponent implements OnInit {
    activeView: boolean = true;
    msg: string;

    constructor(
        public themeService: CustomizerSettingsService,
        private _authService: AuthService,
        private route: ActivatedRoute,
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params:any) => {
            if(params.params.token){
                const body = {
                    token: params.params.token
                }
                this._authService.cancelAppointment(body)
                .subscribe((response:any) => {
                    if(response.ok){
                        setTimeout(() => {
                            this.msg = response.msg
                            this.activeView = false;
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.msg = response.msg
                            this.activeView = false;
                        }, 1000);
                    }
                }, (err: any) =>{

                    if(!err.ok){
                        setTimeout(() => {
                            this.msg = err.error.msg
                            this.activeView = false;
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.msg = err.error.msg
                            this.activeView = false;
                        }, 1000);
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
