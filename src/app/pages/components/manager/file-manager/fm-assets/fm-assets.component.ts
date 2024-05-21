import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from 'ngx-editor';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
  selector: 'app-fm-assets',
  templateUrl: './fm-assets.component.html',
  styleUrls: ['./fm-assets.component.scss']
})
export class FmAssetsComponent implements  OnInit{

    @ViewChild('pdfViewer') pdfViewer: TemplateRef<any>;
    cv:boolean =  false;
    cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15];
    rows: Array<any> = [];

    docs:Array<any> = [];
    files: Array<any> = [];
    UrlFile: any[] = [];
    pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
    urlFileAct: any;
    closeResult: string;
    constructor(
        public dialog: MatDialog,
        public themeService: CustomizerSettingsService,
        private modalService: NgbModal,
    ) {
        this.rows = this.chunkArray(this.cards, 4);
    }


    /**
     * On init
     */
    ngOnInit(): void {

    }

    chunkArray(arr:any[], chunkSize:number) {
        const R = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize));
        }
        return R;
    }

    openCreateDocumentDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(CreateDocumentDialogBox, {
            width: '510px',
            enterAnimationDuration,
            exitAnimationDuration
        });
    }

    getDocuments(card:any){
        this.docs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15];
        this.UrlFile.push(this.pdfSrc)
        this.files = this.chunkArray(this.docs, 2);
        this.cv = true;
    }


    getDismissReason(reason: any) {
        throw new Error('Method not implemented.');
    }

    closeDialog(): void {
        this.dialog.closeAll();
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


@Component({
    selector: 'create-document-dialog-box',
    templateUrl: '../create-document-dialog-box.html',
})
export class CreateDocumentDialogBox {

    constructor(
        public dialogRef: MatDialogRef<CreateDocumentDialogBox>
    ) {}

    close(){
        this.dialogRef.close(true);
    }

}


