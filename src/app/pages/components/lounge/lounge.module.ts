import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoungeRoutingModule } from './lounge-routing.module';
import { LoungeComponent } from './lounge.component';


@NgModule({
  declarations: [
    LoungeComponent
  ],
  imports: [
    CommonModule,
    LoungeRoutingModule
  ]
})
export class LoungeModule { }
