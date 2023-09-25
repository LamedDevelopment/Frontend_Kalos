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
import { FooterModule } from '../shared/componentsShared/footer/footer.module';
import { HeaderModule } from '../shared/componentsShared/header/header.module';
import { SidebarModule } from '../shared/componentsShared/sidebar/sidebar.module';


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
    HeaderModule,
    SidebarModule,
    FooterModule,
    ],
    exports: [
    HelpersComponent,
    PipesComponent,
    HomeComponent,
    BarFiltersComponent
  ]
})
export class PagesModule { }
