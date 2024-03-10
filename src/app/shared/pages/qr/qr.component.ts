import { Component } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { CustomizerSettingsService } from '../../services/customizer-settings.service';

import * as FileSaver from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-qr',
    templateUrl: './qr.component.html',
    styleUrls: ['./qr.component.scss'],
})
export class QrComponent {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    imgsrc: any;
    signUpForm: FormGroup;
    constructor(
        private managerService: ManagerService,
        private _snackBar: MatSnackBar,
        public themeService: CustomizerSettingsService,
        private _formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
        this.getQr();

        this.signUpForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    getQr() {
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        let obj = {
            bussiness: datauser?.business,
            tradename: datauser?.branchOffices[0]?.tradeName,
        };

        this.managerService.getQR('bus/qr', obj).subscribe(
            (res: any) => {
                this.imgsrc = res.msg;
            },
            (error) => {
                this._snackBar.open(error.error.msg, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
            }
        );
    }

    sendEmail() {
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        let obj = {
            business: datauser?.business,
            tradename: datauser?.branchOffices[0]?.tradeName,
            email: this.signUpForm.get('email')?.value,
        };
        // console.log(obj);
        this.managerService.sendEmail('bus/member', obj).subscribe(
            (res: any) => {
                // console.log(res);
                if (res.ok) {
                    this._snackBar.open(res.msg, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
                }
            },
            (error) => {
                this._snackBar.open(error.error.msg, '', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: this.durationInSeconds * 1000,
                });
            }
        );
    }

    downloadImage() {
        fetch(this.imgsrc)
            .then((response) => response.blob())
            .then((blob) => FileSaver.saveAs(blob, 'QRCode'));
    }
}
