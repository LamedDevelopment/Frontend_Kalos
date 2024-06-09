import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalserviceComponent } from 'src/app/pages/components/collaborator/modals/modalservice/modalservice.component';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { SwalServiceService } from 'src/app/pages/services/swal-service.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { dataHistorico } from '../../Interfaces/dataHistorico.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalDescripcionServicioComponent } from '../modal-descripcion-servicio/modal-descripcion-servicio.component';
import { ModalSuministrosComponent } from '../modal-suministros/modal-suministros.component';

@Component({
  selector: 'app-modal-historico-servicios',
  templateUrl: './modal-historico-servicios.component.html',
  styleUrls: ['./modal-historico-servicios.component.scss']
})
export class ModalHistoricoServiciosComponent {

  id_user: any = ''


  ELEMENT_DATA: any[] = [

  ];

  displayedColumns: string[] = ['position', 'Descripcion', 'Suministros'];

  dataSource: any;

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

    this.id_user = data.user_id

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getHistorico();

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


  openModalDescripcion(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ) {
    setTimeout(() => {
      const dialogRef = this.dialog.open(ModalDescripcionServicioComponent, {
        width: '1000px',
        enterAnimationDuration,
        exitAnimationDuration,

        data: {
          data
        },
      });

      dialogRef.afterClosed().subscribe((data) => {
        // Una vez cerrado el modal, puedes acceder a los datos devueltos
        if (data) {
          console.log('Datos del modal cerrado:', data);
        }
      });
    }, 1000);
  }

  openModalSuministros(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ) {
    setTimeout(() => {
      const dialogRef = this.dialog.open(ModalSuministrosComponent, {
        width: '1000px',
        enterAnimationDuration,
        exitAnimationDuration,

        data: {
          data
        },
      });

      dialogRef.afterClosed().subscribe((data) => {
        // Una vez cerrado el modal, puedes acceder a los datos devueltos
        if (data) {
          console.log('Datos del modal cerrado:', data);
        }
      });
    }, 1000);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
