import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../../collaborator/modals/modalservice/modalservice.component';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseApi } from 'src/app/pages/common/Interfaces/Response';

@Component({
    selector: 'app-modal-supplies',
    templateUrl: './modal-supplies.component.html',
    styleUrls: ['./modal-supplies.component.scss'],
})
export class ModalSuppliesComponent {
    displayedColumns: string[] = ['Colaborador', 'Descripcion', 'Editar'];
    data: any = [];
    dataSource = new MatTableDataSource<any>(this.data);

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;

    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private fb: FormBuilder,
        private managerservice: ManagerService,
        private _snackBar: MatSnackBar,
        private swalservice: SwalServiceService,
        @Inject(MAT_DIALOG_DATA) public infomodal: any
    ) {
        console.log('====================================');
        console.log(infomodal.data.supplies);
        console.log('====================================');
        this.data = infomodal.data.supplies;
        this.dataSource = new MatTableDataSource<any>(this.data);
    }
    closeDialog() {
        this.dialogRef.close();
    }

    public aproveAll() {
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];

            element.deliverSupplies = true;
        }

        console.log(this.data);

        console.log('info update', this.infomodal.data);
    }

    saveData() {
        this.managerservice.updateAllSupplies(this.infomodal.data).subscribe(
            (response: ResponseApi) => {
                this._snackBar.open(
                    response.msg
                        ? response.msg
                        : 'Información guardada éxitosamente',
                    '',
                    {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    }
                );
                this.closeDialog();
            },
            (error) => {
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

    updateDeliveryStatus(supply: any) {
        /*  console.log('Supply updated:', supply);
        console.log('====================================');
        console.log(this.infomodal.data);
        console.log('===================================='); */
    }
}
