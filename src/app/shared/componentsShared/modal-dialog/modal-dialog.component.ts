import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'create-user-dialog',
    templateUrl: './modal-dialog.component.html',
})
export class CreateUserDialogBox {

    constructor(
        public dialogRef: MatDialogRef<CreateUserDialogBox>
    ) {}

    close(){
        this.dialogRef.close(true);
    }

}
