import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { AppointmentComponent } from './appo/appo.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { DashComponent } from './dash/dash.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagersComponent } from './managers/managers.component';
import { ServicesParameterComponent } from './services-parameter/services-parameter.component';
import { ServicesParametersComponent } from './services-parameters/services-parameters.component';
import { TypeServiceComponent } from './type-service/type-service.component';
import { TypeServicesComponent } from './type-services/type-services.component';
import { BusinessComponent } from './business.component';
import { AccountComponentBis } from './account/account.component';
import { PrivacyPolicyComponentBis } from './privacy-policy/privacy-policy.component';
import { SecurityComponentBis } from './security/security.component';
import { TermsConditionsComponentBis } from './terms-conditions/terms-conditions.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEditorModule } from 'ngx-editor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AppointmentComponent,
    CollaboratorsComponent,
    DashComponent,
    ManagerComponent,
    ManagersComponent,
    ServicesParameterComponent,
    ServicesParametersComponent,
    TypeServiceComponent,
    TypeServicesComponent,
    BusinessComponent,
    AccountComponentBis,
    PrivacyPolicyComponentBis,
    SecurityComponentBis,
    TermsConditionsComponentBis
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    RouterModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgApexchartsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgScrollbarModule,
    FormsModule,
    FullCalendarModule,
    MatNativeDateModule ,
    ReactiveFormsModule,
    CarouselModule,
    NgxEditorModule,
    DragDropModule,
    HttpClientModule,
    CdkAccordionModule,
    NgxMaterialTimepickerModule,
  ]
})
export class BusinessModule { }
