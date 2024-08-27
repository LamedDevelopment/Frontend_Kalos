import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { commonComponentsModule } from '../../common/commonComponents.module';
import { HelpermoduleModule } from '../../helpers/helpermodule.module';
import { UploadFileModule } from '../business/views-shared/upload-file/upload-file.module';
import { AccountComponentColl } from './account/account.component';
import { AppointmentComponentColl } from './appo/appo.component';
import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorComponent } from './collaborator.component';
import { DashComponent } from './dash/dash.component';
import { HistoricalComponent } from './historical/historical.component';
import { CloseserviceComponent } from './modals/closeservice/closeservice.component';
import { LoanmodalComponent } from './modals/loanmodal/loanmodal.component';
import { ModalserviceComponent } from './modals/modalservice/modalservice.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { PrivacyPolicyComponentColl } from './privacy-policy/privacy-policy.component';
import { SecurityComponentColl } from './security/security.component';
import { ServiceComponent } from './service/service.component';
import { ServicesComponent } from './services/services.component';
import { SolicitudcollaComponent } from './solicitudcolla/solicitudcolla.component';
import { TermsConditionsComponentColl } from './terms-conditions/terms-conditions.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
    declarations: [
        DashComponent,
        HistoricalComponent,
        PaymentComponent,
        PaymentsComponent,
        PayrollComponent,
        PayrollsComponent,
        ServiceComponent,
        ServicesComponent,
        TicketsComponent,
        TicketComponent,
        WalletComponent,
        CollaboratorComponent,
        AppointmentComponentColl,
        AccountComponentColl,
        PrivacyPolicyComponentColl,
        SecurityComponentColl,
        TermsConditionsComponentColl,
        ModalserviceComponent,
        CloseserviceComponent,
        SolicitudcollaComponent,
        LoanmodalComponent,
    ],
    imports: [
        CommonModule,
        CollaboratorRoutingModule,
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
        MatNativeDateModule,
        ReactiveFormsModule,
        CarouselModule,
        NgxEditorModule,
        DragDropModule,
        HttpClientModule,
        CdkAccordionModule,
        NgxMaterialTimepickerModule,
        HelpermoduleModule,
        commonComponentsModule,
        UploadFileModule
    ],
})
export class CollaboratorModule {}
