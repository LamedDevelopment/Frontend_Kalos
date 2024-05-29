import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import { CreateDocumentDialogBoxComponent } from 'src/app/shared/create-document-dialog-box/create-document-dialog-box.component';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-fm-personal',
  templateUrl: './fm-personal.component.html',
  styleUrls: ['./fm-personal.component.scss']
})
export class FmPersonalComponent implements  OnInit, AfterViewInit {

    @ViewChild('pdfViewer') pdfViewer: TemplateRef<any>;
    cv:boolean =  false;
    cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15];
    rows: Array<any> = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    docs:Array<any> = [];
    files: Array<any> = [];
    UrlFile: any[] = [];
    pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
    urlFileAct: any;
    closeResult: string;
    user: any;
    constructor(
        public dialog: MatDialog,
        public themeService: CustomizerSettingsService,
        private modalService: NgbModal,
        private managerservice: ManagerService,
        private _userService: UserService
    ) {
        this.rows = this.chunkArray(this.cards, 4);
    }

    /**
     * On init
     */
    ngOnInit(): void {
         this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
                console.log(this.user)
            });
    }

    ngAfterViewInit() {
        this.getDocuments();
    }

    chunkArray(arr:any[], chunkSize:number) {
        const R = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize));
        }
        return R;
    }

    openCreateDocumentDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.width = '510px';
        dialogConfig.enterAnimationDuration = enterAnimationDuration;
        dialogConfig.exitAnimationDuration =  exitAnimationDuration;


        dialogConfig.data = {
            name: "Documentos Basicos",
        };

        this.dialog
            .open(CreateDocumentDialogBoxComponent, dialogConfig)
            .afterClosed()
            .subscribe((data) => {
                console.log(data)
            });

    }

    getDocuments(){
        let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);
        const data = {
            business: datauser.business,
            nit: datauser.nit,
            nameBusiness: datauser.businessName,
            tradename: datauser.branchOffices[0].tradeName,
            documentType: "Documentos Basicos"
        }
        this.managerservice.getDocumentsGeneral(data).subscribe((docs:any) => {
            console.log(docs);
            this.docs = docs.msg; //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15];
            // this.UrlFile.push(this.pdfSrc)
            this.files = this.chunkArray(this.docs, 2);
            this.cv = true;
        });
    }


     openViewer(){
        this.modalService.open(this.pdfViewer, {
            ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, scrollable: true
        })
    }

    closePdf() {
        this.modalService.dismissAll();
    }

}
