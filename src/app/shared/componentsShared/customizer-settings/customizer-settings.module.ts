import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsComponent } from './customizer-settings.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CustomizerSettingsComponent
  ],
  imports: [
        CommonModule,
        NgScrollbarModule,
        CdkAccordionModule,
        MatExpansionModule,
        MatDividerModule,
        MatIconModule
    ],
    exports: [
      CustomizerSettingsComponent
  ]
})
export class CustomizerSettingsModule { }
