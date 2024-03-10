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

@NgModule({
    declarations: [
        ClassComponent,
        ModelsComponent,
        PipesComponent,
        CreateUserDialogBox,
        QrComponent,
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    exports: [
        ClassComponent,
        ModelsComponent,
        PipesComponent,
        CreateUserDialogBox,
    ],
})
export class SharedModule {}
