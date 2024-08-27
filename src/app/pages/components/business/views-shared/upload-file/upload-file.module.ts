import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadFileComponent } from './upload-file.component';

@NgModule({
    declarations: [
        UploadFileComponent
    ],
    imports : [
        RouterModule,
        SharedModule,
        CommonModule,
        MatButtonModule,
        NgxDropzoneModule,
        MatIconModule,
        NgxDocViewerModule,
        MatCardModule,
        MatListModule


    ],
    exports     : [
        UploadFileComponent
    ]
})
export class UploadFileModule
{
}
