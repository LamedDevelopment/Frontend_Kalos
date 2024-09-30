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
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { commonComponentsModule } from '../../common/commonComponents.module';
import { HelpermoduleModule } from '../../helpers/helpermodule.module';
import { UploadFileModule } from '../business/views-shared/upload-file/upload-file.module';
import { AgendadayComponent } from './agendaday/agendaday.component';
import { AgendamonthComponent } from './agendamonth/agendamonth.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BillingComponent } from './billing/billing.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ModalegresoComponent } from './checkout/modals/modalegreso/modalegreso.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CustomerratingComponent } from './customerrating/customerrating.component';
import { DashComponent } from './dash/dash.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FmAssetsComponent } from './file-manager/fm-assets/fm-assets.component';
import { FmDocumentsComponent } from './file-manager/fm-documents/fm-documents.component';
import { FmMediaComponent } from './file-manager/fm-media/fm-media.component';
import { FmPersonalComponent } from './file-manager/fm-personal/fm-personal.component';
import { FmProjectsComponent } from './file-manager/fm-projects/fm-projects.component';
import { FmRecentFilesComponent } from './file-manager/fm-recent-files/fm-recent-files.component';
import { FmSidebarComponent } from './file-manager/fm-sidebar/fm-sidebar.component';
import { FmTemplatesComponent } from './file-manager/fm-templates/fm-templates.component';
import { GeneralConfComponent } from './general-conf/general-conf.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ConfigTurnosComponent } from './modals/config-turnos/config-turnos.component';
import { configModalComponent } from './modals/configModal/configModal.component';
import { GeneratePermisosComponent } from './modals/generate-permisos/generate-permisos.component';
import { ModalSuppliesComponent } from './modals/modal-supplies/modal-supplies.component';
import { PaymentsModalComponent } from './modals/paymentsModal/paymentsModal.component';
import { ticketsModalComponent } from './modals/ticketsModal/ticketsModal.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { RatingserviceComponent } from './ratingservice/ratingservice.component';
import { SeesupliesComponent } from './seesuplies/seesuplies.component';
import { ServicesComponent } from './services/services.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ViewAllCollaComponent } from './view-all-colla/view-all-colla.component';
import { ChecksloansComponent } from './wallet/components/checksloans/checksloans.component';
import { ModalliquidacionComponent } from './wallet/modals/modalliquidacion/modalliquidacion.component';
import { WalletComponent } from './wallet/wallet.component';
import { MenuCheckoutComponent } from './checkout/menu-checkout/menu-checkout.component';
import { CajaCheckoutComponent } from './checkout/caja-checkout/caja-checkout.component';
import { EgresoCheckoutComponent } from './checkout/egreso-checkout/egreso-checkout.component';
import { AnticiposCheckoutComponent } from './checkout/anticipos-checkout/anticipos-checkout.component';
import { BalanceCheckoutComponent } from './checkout/balance-checkout/balance-checkout.component';
import { CierreCheckoutComponent } from './checkout/cierre-checkout/cierre-checkout.component';
import { CardTipoCheckoutComponent } from './checkout/card-tipo-checkout/card-tipo-checkout.component';
import { CardTotalCheckoutComponent } from './checkout/card-total-checkout/card-total-checkout.component';
@NgModule({
    declarations: [
        AgendadayComponent,
        AgendamonthComponent,
        WalletComponent,
        BillingComponent,
        CollaboratorComponent,
        CollaboratorsComponent,
        CustomerratingComponent,
        GeneralConfComponent,
        DashComponent,
        PaymentComponent,
        PaymentsComponent,
        PayrollComponent,
        PayrollsComponent,
        RatingserviceComponent,
        ServicesComponent,
        TicketComponent,
        TicketsComponent,
        ManagerComponent,
        AppointmentComponent,
        PaymentsModalComponent,
        ticketsModalComponent,
        ModalliquidacionComponent,
        ChecksloansComponent,
        CheckoutComponent,
        ModalegresoComponent,
        FileManagerComponent,
        FmProjectsComponent,
        FmPersonalComponent,
        FmTemplatesComponent,
        FmAssetsComponent,
        FmSidebarComponent,
        FmDocumentsComponent,
        FmMediaComponent,
        FmRecentFilesComponent,
        ConfigTurnosComponent,
        ViewAllCollaComponent,
        GeneratePermisosComponent,
        configModalComponent,
        SeesupliesComponent,
        ModalSuppliesComponent,
        MenuCheckoutComponent,
        CajaCheckoutComponent,
        EgresoCheckoutComponent,
        AnticiposCheckoutComponent,
        BalanceCheckoutComponent,
        CierreCheckoutComponent,
        CardTipoCheckoutComponent,
        CardTotalCheckoutComponent,
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule,
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
        NgxDocViewerModule,
        PdfViewerModule,
        UploadFileModule
    ],
})
export class ManagerModule {}
