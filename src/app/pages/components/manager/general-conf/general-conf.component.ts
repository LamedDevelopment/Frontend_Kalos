import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { configModalComponent } from '../modals/configModal/configModal.component';

@Component({
  selector: 'app-general-conf',
  templateUrl: './general-conf.component.html',
  styleUrls: ['./general-conf.component.scss']
})
export class GeneralConfComponent implements  OnInit {

    rows: Array<any> = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    cards: Array<any>;
    user: any;

    constructor(
        public dialog: MatDialog,
        public themeService: CustomizerSettingsService,
        private modalService: NgbModal,
        private managerservice: ManagerService,
        private _userService: UserService
    ) {
        // this.rows = this.chunkArray(this.cards, 4);
    }

     /**
     * On init
     */
    ngOnInit(): void {
         this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
            });
        this.getConfigs();
    }


    chunkArray(arr:any[], chunkSize:number) {
        const R = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize));
        }
        return R;
    }


    openCreateDocumentDialog(selectedTemplate: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '1000px';
        dialogConfig.enterAnimationDuration = enterAnimationDuration;
        dialogConfig.exitAnimationDuration =  exitAnimationDuration;

        dialogConfig.data = {
            selectedTemplate: selectedTemplate.split(' ').join('_'),
        };

        this.dialog
            .open(configModalComponent, dialogConfig)
            .afterClosed()
            .subscribe((data) => {
            });

    }


    getConfigs(){
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        /* const data = {
            business: datauser.business,
            nit: datauser.nit,
            nameBusiness: datauser.businessName,
            tradename: datauser.branchOffices[0].tradeName,
            documentType: "Documentacion Ente de Salud"
        } */
        const res = [
            {name: 'Bancos', value: 'Crear y editar'},
            {name: 'Turnos', value: 'Crear y editar'},
            {name: 'Almacen', value: 'Crear y editar'},
        ];
        // this.UrlFile.push(this.pdfSrc)
        this.managerservice.getConfigs().subscribe((conf:any) => {
            this.cards = conf.msg.generalConfig;

        });
    }

}
