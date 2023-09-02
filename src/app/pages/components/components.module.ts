import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ComponentsRoutingModule } from './components-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsComponent } from './components.component';


@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
      ComponentsRoutingModule,
      MatFormFieldModule,
      MatCardModule,
      MatIconModule,
      FlexLayoutModule,

  ]
})
export class ComponentsModule { }
