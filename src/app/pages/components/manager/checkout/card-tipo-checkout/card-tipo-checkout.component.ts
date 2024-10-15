import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseApi } from 'src/app/pages/common/Interfaces/Response';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';


@Component({
  selector: 'app-card-tipo-checkout',
  templateUrl: './card-tipo-checkout.component.html',
  styleUrls: ['./card-tipo-checkout.component.scss']
})
export class CardTipoCheckoutComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 3;
    data = [];
    dataSource = new MatTableDataSource<any>(this.data);
    totalVentas: any;
    dataPagos: any = [];
  
    constructor(
      public themeService: CustomizerSettingsService,
      public dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private managerservice: ManagerService
  ) {}

  ngOnInit(): void {
    this.getOrdenes();
    this.getTiposPagos();
  }

  getTiposPagos() {
    this.managerservice.getTiposPagosCheckout().subscribe(
        (response: ResponseApi) => {
            this.dataPagos = response.msg;
        },
        (error) => {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
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

  getOrdenes() {
      this.managerservice.getSalesofDay().subscribe(
          (response) => {
              this.data = response.msg.DetallesVentas;
              this.dataSource = new MatTableDataSource<any>(this.data);
              // this.dataSource.paginator = this.paginator;
              this.totalVentas = response.msg.TotalVentas;
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
}
