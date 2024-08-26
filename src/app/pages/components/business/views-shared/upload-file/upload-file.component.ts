import { Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
// import { environment } from '../../../../environments/environment';
// import { deleteFile } from 'app/modules/utils/uploadFile';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'upload-file',
    templateUrl: './upload-file.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UploadFileComponent implements OnDestroy {

    files:File[] =[];
    @Input() archivos:any = {};
    @Input()
    typeDoc: any;
    @Input()
    dataStyle:any;
    @Input()
    edit: boolean;
    @Input()
    number:number;
    @Input()
    SeeDocs:boolean;
    @Output() buttonEvent: EventEmitter<any> = new EventEmitter<any>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    infoUserData: any;
    url: string;
    UrlFile: any[] = [];
    pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
    UrlFileImage: any[] = [];
    archivosView: any[] = [];

    /**
     * Constructor
     */
    constructor(
        private toastr: ToastrService,
        private _snackBar: MatSnackBar
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */

    async ngOnInit(){
       /*  this.infoUserData = JSON.parse(localStorage.getItem('user'));
        this.url = `${this.infoUserData.carpetaAutos ? this.infoUserData.carpetaAutos : this.archivos.clienteAgen.carpetaAutos}`;
        if(this.archivos?.archivos.length > 0) {
            JSON.parse(this.archivos.archivos).forEach(async (item:any) => {
                const archivo = `${environment.URL_BUCKET}${this.url}/${item}`;
                this.archivosView.push({name:item, file:archivo})
                if(item?.split('.')[1] == 'jpg' || item.split('.')[1] == 'png' || item.split('.')[1] == 'jpeg'){
                    this.UrlFileImage.push({file:`${environment.URL_BUCKET}${this.url}/${item}`})
                } else {
                    this.UrlFile.push({file:`${environment.URL_BUCKET}${this.url}/${item}`});
                }

                const data = await axios.get(archivo, {
                    responseType: "arraybuffer",
                })
                const newData = new File([data.data],`${item}`)
                this.files.push(newData);
            })

        } */
    }

    DownloadFile(file:any){
        window.open(`${file.file}`, '_blank');
    }

    validation(){
        //console.log(this.infoUserData.infoRol === 'ABOGADO_PYME' && this.edit === true && this.number === 2, this.number, this.edit)
        return
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onSelect(event:any) {
        if(event.addedFiles[0].size > 20000000){
            this.toastr.error('El archivo no debe superar 20 megas', '', {timeOut: 5000, progressBar: true})
        } else {
            if (this.files.length >= 1) {
                // this.toastr.error('Elimine el archivo para subir uno nuevo', '', {timeOut: 5000, progressBar: true})
                this._snackBar.open('Elimine el archivo para subir uno nuevo', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
            } else {
                this.files.push(...event.addedFiles);
                this.buttonEvent.emit({files:this.files});
            }
        }

    }

    async onRemove(event:any) {
        this.files.splice(this.files.indexOf(event), 1);
        // const result = await deleteFile(this.url,event);
        this.buttonEvent.emit({files:this.files});
    }

    buttonAction():void{
        this.buttonEvent.emit({files:this.files});
    }
}
