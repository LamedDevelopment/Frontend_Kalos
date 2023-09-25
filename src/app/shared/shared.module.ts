import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ClassComponent } from './class/class.component';
import { HelpersComponent } from './helpers/helpers.component';
import { ModelsComponent } from './models/models.component';
import { PipesComponent } from './pipes/pipes.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateUserDialogBox } from './componentsShared/modal-dialog/modal-dialog.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ClassComponent,
    HelpersComponent,
    ModelsComponent,
    PipesComponent,
    CreateUserDialogBox
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatButtonModule
    ],
    exports: [
        ClassComponent,
        HelpersComponent,
        ModelsComponent,
        PipesComponent,
        CreateUserDialogBox
    ]
})
export class SharedModule { }
