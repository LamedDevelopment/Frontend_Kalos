import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalserviceComponent } from 'src/app/pages/components/collaborator/modals/modalservice/modalservice.component';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { dataHistorico } from '../../Interfaces/dataHistorico.interface';

@Component({
  selector: 'app-modal-modal-reasignacion',
  templateUrl: './modal-modal-reasignacion.component.html',
  styleUrls: ['./modal-modal-reasignacion.component.scss']
})
export class ModalReasignacionComponent {

  id_user: any = ''


  ELEMENT_DATA: any[] = [

  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  displayedColumns: string[] = ['position', 'Descripcion', 'Suministros'];
  dataCollaborators: any = [];
  dataSource: any;
  startServiceform: FormGroup;
  optionselected = "";
  valueInput: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public themeService: CustomizerSettingsService,
    private dialogRef: MatDialogRef<ModalserviceComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private managerservice: ManagerService,
    private _snackBar: MatSnackBar,
    private swalservice: SwalServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);


  }

  ngOnInit(): void {
    this.getColla();
  }


  getHistorico() {

    try {

      let body = {
        "userID": this.id_user
      }
      this.managerservice.getHistoricoByUser(body).subscribe((response: dataHistorico) => {
        console.log('res', response);
        this.ELEMENT_DATA = response.msg;
        this.dataSource = new MatTableDataSource<any>(
          this.ELEMENT_DATA
        );
        this.dataSource.paginator = this.paginator;

      });

    } catch (error) {
      console.log("error al consultar historico", error);
    }
  }

  getColla() {
    let body = {
        "business": {
            "business": this.data.element.business.business,
            "nit": this.data.element.business.nit,
            "nameBusiness": this.data.element.business.nameBusiness,
            "tradename": this.data.element.Peluqueria
        },
        "appointmentID": this.data.element._id,
        "serviceID": this.data.element.services[0].serviceID,
        "TypeServiceID": this.data.element.services[0].TypeServiceID
    }
    this.managerservice
      .getCollaborators("bus/viewnewcolla", body)
      .subscribe((response: any) => {
        this.dataCollaborators = response.msg;
      });
  }

  onCollaChange() {
    this.valueInput = this.valueInput;
    let body = {
        "business": {
            "business": this.data.element.business.business,
            "nit": this.data.element.business.nit,
            "nameBusiness": this.data.element.business.nameBusiness,
            "tradename": this.data.element.Peluqueria
        },
        "appointmentID": this.data.element._id,
        "newColla": this.valueInput.user,
        "fullNameNewColla": `${this.valueInput.name} ${this.valueInput.lastname}`
    }
    console.log(body)
    this.managerservice
      .getCollaborators("apu/editnewcolla", body)
      .subscribe((response: any) => {
        this.dialogRef.close();
        this._snackBar.open(response.msg, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
        });
      });
  }




  closeDialog() {
    this.dialogRef.close();
  }
}
