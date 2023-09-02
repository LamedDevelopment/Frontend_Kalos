import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgScrollbarModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule
    ],
    exports: [
      SidebarComponent
  ]
})
export class SidebarModule { }
