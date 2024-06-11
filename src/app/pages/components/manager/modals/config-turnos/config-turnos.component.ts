import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBar,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../../collaborator/modals/modalservice/modalservice.component';
import { select } from 'src/app/pages/common/Interfaces/select.interface';
import { ResponseApi } from 'src/app/pages/common/Interfaces/Response';

@Component({
    selector: 'app-config-turnos',
    templateUrl: './config-turnos.component.html',
    styleUrls: ['./config-turnos.component.scss'],
})
export class ConfigTurnosComponent {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    id_user = '';
    bussines: any;
    user: any;
    hourSelected = {
        nameHours: '',
        startTime: '',
        endTime: '',
    };

    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private fb: FormBuilder,
        private managerservice: ManagerService,
        private _snackBar: MatSnackBar,
        private swalservice: SwalServiceService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.id_user = '';
        this.bussines = data.bussines;
        this.user = data.user;
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        this.id_user = data.id;
    }

    turnosSelected(event: select) {
        console.log(event);
        this.hourSelected.nameHours = event.valor.nameHours;
        this.hourSelected.startTime = event.valor.startTime;
        this.hourSelected.endTime = event.valor.endTime;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    public update() {
        if (!this.id_user) {
            console.log('sin id de usuario');
            return;
        }
        const loading = this.swalservice.getLoading();
        this.user.staffID = this.id_user;
        let body = {
            bussines: this.bussines,
            user: this.user,
            TypeOfWorkingHours: this.hourSelected,
        };
        this.managerservice.updateTurnosColla(body).subscribe(
            (response: ResponseApi) => {
                console.log(response);
                loading.close();
                if (response.ok) {
                    this._snackBar.open(
                        response.msg
                            ? response.msg
                            : 'Actualizado Correctamente',
                        '',
                        {
                            horizontalPosition: this.horizontalPosition,
                            verticalPosition: this.verticalPosition,
                            duration: this.durationInSeconds * 1000,
                        }
                    );

                    this.closeDialog();
                }
            },
            (error) => {
                loading.close();
                this._snackBar.open(
                    error.error.msg
                        ? error.error.msg
                        : 'Error Al consultar información',
                    '',
                    {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    }
                );
            }
        );
    }
}
