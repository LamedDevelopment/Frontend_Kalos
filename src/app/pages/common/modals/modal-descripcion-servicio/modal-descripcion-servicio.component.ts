import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalserviceComponent } from 'src/app/pages/components/collaborator/modals/modalservice/modalservice.component';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-modal-descripcion-servicio',
  templateUrl: './modal-descripcion-servicio.component.html',
  styleUrls: ['./modal-descripcion-servicio.component.scss']
})
export class ModalDescripcionServicioComponent {

  ELEMENT_DATA: any[] = [];

  displayedColumns: string[] = ['Nombre Servicio', 'Costo'];

  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data.data.length == 0) {
      this._snackBar.open('El servicio no cuenta con Descripciones', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      this.closeDialog();
    }

    this.ELEMENT_DATA = data.data
    this.dataSource = new MatTableDataSource<any>(
      this.ELEMENT_DATA
    );
    this.dataSource.paginator = this.paginator;

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
