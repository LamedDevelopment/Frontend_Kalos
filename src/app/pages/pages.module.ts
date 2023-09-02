import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


import { PagesRoutingModule } from './pages-routing.module';
import { HelpersComponent } from './helpers/helpers.component';
import { ModelsComponent } from './models/models.component';
import { PipesComponent } from './pipes/pipes.component';
import { HomeComponent } from './components/home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarFiltersComponent } from './class/bar-filters/bar-filters.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    HelpersComponent,
    ModelsComponent,
    PipesComponent,
    HomeComponent,
    BarFiltersComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PagesRoutingModule,
    ScrollingModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    SharedModule,
    ],
    exports: [
    HelpersComponent,
    ModelsComponent,
    PipesComponent,
    HomeComponent,
    BarFiltersComponent
  ]
})
export class PagesModule { }
