import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


import { PagesRoutingModule } from './pages-routing.module';
import { HelpersComponent } from './helpers/helpers.component';
import { PipesComponent } from './pipes/pipes.component';
import { HomeComponent } from './components/home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarFiltersComponent } from './class/bar-filters/bar-filters.component';
import { PagesComponent } from './pages.component';
import { ModelsComponent } from '../shared/models/models.component';


@NgModule({
  declarations: [
    HelpersComponent,
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
  ],
})
export class PagesModule { }
