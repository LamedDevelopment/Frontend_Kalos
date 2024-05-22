import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { UserService } from 'src/app/pages/services/user/user.service';
import axios from 'axios';
import FormDataAxios from 'form-data';

@Component({
  selector: 'app-create-document-dialog-box',
  templateUrl: './create-document-dialog-box.component.html',
  styleUrls: ['./create-document-dialog-box.component.scss']
})
export class CreateDocumentDialogBoxComponent implements OnInit {
    referencia:string;
    horizontalPosition : MatSnackBarHorizontalPosition = 'start' ;
    verticalPosition: MatSnackBarVerticalPosition = 'top' ;
    durationInSeconds = 5;
    form: FormGroup;
    optionselected = '';
    valueInput: any;
    dataSelect: any = [];
    files: File[] = [];
    user: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        public dialogRef: MatDialogRef<CreateDocumentDialogBoxComponent>,
        @Inject(MAT_DIALOG_DATA) data:any,
        private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder,
        private managerservice: ManagerService,
        private _userService: UserService
    ) {
        this.referencia = data.name;
    }

    async ngOnInit() {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
            });
        this.chargeSelect();
        this.form = this._formBuilder.group({
            collaDocu: ['', Validators.required],
            nameDocument: ['', Validators.required],
        });
    }


    chargeSelect(){
        this.managerservice.getNameDocuments().subscribe((response: any) => {
            this.dataSelect = response.msg.filter((el:any) => el.documentType === this.referencia);
        });
    }

    onNameChange(event: any) {
        this.form.get('nameDocument')?.setValue(event.value?.documentCode)
    }

    uploadDocument() {
        const data = this.form.getRawValue()
        let token = sessionStorage.getItem('accessToken');
        const formDataIm = new FormDataAxios();
        formDataIm.append('file', this.files[0]);
        formDataIm.append('businessID', this.user.business.business);
        formDataIm.append('nameBusiness', this.user.business.businessName);
        formDataIm.append('businessNit', this.user.business.nit);
        formDataIm.append('tradename', this.user.business.branchOffices[0].tradeName);
        formDataIm.append('nameDocument', data.nameDocument);
        formDataIm.append('collaDocu', data.collaDocu);

        // Construir el payload JSON
        // const jsonPayload = {
        //     businessID: this.user.business.business,
        //     nameBusiness: this.user.business.businessName,
        //     businessNit: this.user.business.nit,
        //     tradename: this.user.business.branchOffices[0].tradeName,
        //     nameDocument: data.nameDocument,
        //     collaDocu: data.collaDocu,
        // };
        // Añadir el payload JSON a FormData como string
        // formDataIm.append('data', JSON.stringify(jsonPayload));

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://devback.bellezaap.com/api/v1/doc/mm',
          headers: {
            'x-token': token,
            // ...formDataIm.getHeaders()
          },
          data : formDataIm
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

        /* this.managerservice.generalPostApiFiles('doc/mm', formDataIm).subscribe((response: any) => {
                    console.log(response)
                    this.dialogRef.close(response);
        },
        (error: any) => {
            console.error('Error:', error);
            this.dialogRef.close(error);
        }); */
    }

    close(){
        this.dialogRef.close(false);
    }

    onUploadError(event:any){
        console.log(event)
    }

    onUploadSuccess(event:any){
        console.log(event)
    }

    onSelect(event:any) {
      if(event.addedFiles[0].size > 5000000){
            this._snackBar.open('El archivo no debe superar 5 megas', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
        } else if(this.files.length > 0) {
            this._snackBar.open('Solo es permitido un archivo', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
        } else {
            this.files.push(...event.addedFiles);
        }
    }

    onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }

}
