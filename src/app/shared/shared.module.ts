import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ClassComponent } from './class/class.component';
import { HelpersComponent } from './helpers/helpers.component';
import { ModelsComponent } from './models/models.component';
import { PipesComponent } from './pipes/pipes.component';


@NgModule({
  declarations: [
    ClassComponent,
    HelpersComponent,
    ModelsComponent,
    PipesComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ],
    exports: [
        ClassComponent,
        HelpersComponent,
        ModelsComponent,
        PipesComponent,
    ]
})
export class SharedModule { }
