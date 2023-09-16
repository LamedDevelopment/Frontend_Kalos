import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoungeRoutingModule } from './lounge-routing.module';
import { LoungeComponent } from './lounge.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LngStatsComponent } from './lng-stats/lng-stats.component';
import { LngCollaboratorsComponent } from './lng-collaborators/lng-collaborators.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    LoungeComponent,
    LngStatsComponent,
    LngCollaboratorsComponent,


  ],
  imports: [
    CommonModule,
    LoungeRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
      FlexLayoutModule,
    MatMenuModule,
  ]
})
export class LoungeModule { }
