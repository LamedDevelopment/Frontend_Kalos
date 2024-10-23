import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClassComponent } from './class/class.component';
import { SharedRoutingModule } from './shared-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { CreateUserDialogBox } from './componentsShared/modal-dialog/modal-dialog.component';
import { CreateDocumentDialogBoxComponent } from './create-document-dialog-box/create-document-dialog-box.component';
import { ModelsComponent } from './models/models.component';
import { QrComponent } from './pages/qr/qr.component';
import { PipesComponent } from './pipes/pipes.component';
import { FacebookAuthService } from './services/auth-Fb.service.service';

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
        FacebookAuthService
    ]
})
export class SharedModule {}
