import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ClassComponent } from './class/class.component';

import { ModelsComponent } from './models/models.component';
import { PipesComponent } from './pipes/pipes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateUserDialogBox } from './componentsShared/modal-dialog/modal-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { QrComponent } from './pages/qr/qr.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateDocumentDialogBoxComponent } from './create-document-dialog-box/create-document-dialog-box.component';
import { MatSelectModule } from '@angular/material/select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgxDropzoneModule } from 'ngx-dropzone';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  maxFiles: 1,
  acceptedFiles: 'application/pdf',
  createImageThumbnails: true,
  uploadMultiple: false,
    addRemoveLinks: true
};

@NgModule({
    declarations: [
        ClassComponent,
        ModelsComponent,
        PipesComponent,
        CreateUserDialogBox,
        QrComponent,
        CreateDocumentDialogBoxComponent,
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        DropzoneModule,
        NgxDropzoneModule,
    ],
    exports: [
        ClassComponent,
        ModelsComponent,
        PipesComponent,
        CreateUserDialogBox,
    ],
    providers: [
        {
          provide: DROPZONE_CONFIG,
          useValue: DEFAULT_DROPZONE_CONFIG
        },
    ]
})
export class SharedModule {}
