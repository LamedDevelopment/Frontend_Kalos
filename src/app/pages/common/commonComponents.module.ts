import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AnalyticsActivityComponent } from './analytics/analytics-activity/analytics-activity.component';
import { AnalyticsAudienceOverviewComponent } from './analytics/analytics-audience-overview/analytics-audience-overview.component';
import { AnalyticsGenderComponent } from './analytics/analytics-gender/analytics-gender.component';
import { AnalyticsLanguageComponent } from './analytics/analytics-language/analytics-language.component';
import { AnalyticsStatsComponent } from './analytics/analytics-stats/analytics-stats.component';
import { AnalyticsStatusComponent } from './analytics/analytics-status/analytics-status.component';
import { AnalyticsTotalRevenueComponent } from './analytics/analytics-total-revenue/analytics-total-revenue.component';
import { AnalyticsComponentUno } from './analytics/analytics.component';
import { BrowserUsedTrafficReportsComponent } from './analytics/browser-used-traffic-reports/browser-used-traffic-reports.component';
import { NewVsReturingComponent } from './analytics/new-vs-returing/new-vs-returing.component';
import { RevenueReportComponent } from './analytics/revenue-report/revenue-report.component';
import { SalesAnalyticsComponent } from './analytics/sales-analytics/sales-analytics.component';
import { SessionsByCountriesComponent } from './analytics/sessions-by-countries/sessions-by-countries.component';
import { SessionsDeviceComponent } from './analytics/sessions-device/sessions-device.component';
import { TerminalsComponent } from './analytics/terminals/terminals.component';
import { TotalTransactionsComponent } from './analytics/total-transactions/total-transactions.component';
import { VisitorsAgeComponent } from './analytics/visitors-age/visitors-age.component';
import { WelcomeDashboardComponent } from './analytics/welcome-dashboard/welcome-dashboard.component';
import { AutocompleteProductosComponent } from './inputs/autocomplete-productos/autocomplete-productos.component';
import { EmailuserComponent } from './inputs/emailuser/emailuser.component';
import { ModalappoforaComponent } from './modalappofora/modalappofora.component';
import { ModalappomanagerComponent } from './modalappomanager/modalappomanager.component';
import { ModalDescripcionServicioComponent } from './modals/modal-descripcion-servicio/modal-descripcion-servicio.component';
import { ModalHistoricoServiciosComponent } from './modals/modal-historico-servicios/modal-historico-servicios.component';
import { ModalReasignacionComponent } from './modals/modal-reasignacion/modal-modal-reasignacion.component';
import { ModalSuministrosComponent } from './modals/modal-suministros/modal-suministros.component';
import { MarcaComponent } from './selects/marca/marca.component';
import { ProductComponent } from './selects/product/product.component';
import { ReferenceComponent } from './selects/reference/reference.component';
import { SelectDateServiceComponent } from './selects/select-date-service/select-date-service.component';
import { SelectHoursServiceComponent } from './selects/select-hours-service/select-hours-service.component';
import { SelectPermisosComponent } from './selects/select-permisos/select-permisos.component';
import { SelectTurnosComponent } from './selects/select-turnos/select-turnos.component';
import { SelectTypeServicesComponent } from './selects/select-type-services/select-type-services.component';
import { SelectbussinesComponent } from './selects/selectbussines/selectbussines.component';
import { SelectcollaboratorComponent } from './selects/selectcollaborator/selectcollaborator.component';
import { SelectpaymethodComponent } from './selects/selectpaymethod/selectpaymethod.component';
import { SelectservicesComponent } from './selects/selectservices/selectservices.component';

@NgModule({
    declarations: [
        SelectbussinesComponent,
        ModalappoforaComponent,
        SelectservicesComponent,
        SelectcollaboratorComponent,
        SelectTypeServicesComponent,
        SelectDateServiceComponent,
        SelectHoursServiceComponent,
        ModalappomanagerComponent,
        EmailuserComponent,
        ProductComponent,
        MarcaComponent,
        ReferenceComponent,
        SelectpaymethodComponent,
        WelcomeDashboardComponent,
        AnalyticsComponentUno,
        AnalyticsStatusComponent,
        AnalyticsStatsComponent,
        AnalyticsAudienceOverviewComponent,
        SalesAnalyticsComponent,
        RevenueReportComponent,
        AnalyticsTotalRevenueComponent,
        AnalyticsActivityComponent,
        BrowserUsedTrafficReportsComponent,
        SessionsByCountriesComponent,
        TotalTransactionsComponent,
        TerminalsComponent,
        NewVsReturingComponent,
        AnalyticsGenderComponent,
        VisitorsAgeComponent,
        AnalyticsLanguageComponent,
        SessionsDeviceComponent,
        ModalHistoricoServiciosComponent,
        ModalDescripcionServicioComponent,
        ModalSuministrosComponent,
        SelectTurnosComponent,
        SelectPermisosComponent,
        AutocompleteProductosComponent,
        ModalReasignacionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatMenuModule,
        NgApexchartsModule,
        MatPaginatorModule,
        MatTableModule,
    ],
    exports: [
        SelectbussinesComponent,
        ModalappoforaComponent,
        SelectservicesComponent,
        SelectcollaboratorComponent,
        SelectTypeServicesComponent,
        SelectDateServiceComponent,
        SelectHoursServiceComponent,
        EmailuserComponent,
        ProductComponent,
        MarcaComponent,
        ReferenceComponent,
        SelectpaymethodComponent,
        AnalyticsComponentUno,
        AnalyticsStatusComponent,
        AnalyticsStatsComponent,
        AnalyticsAudienceOverviewComponent,
        SalesAnalyticsComponent,
        RevenueReportComponent,
        AnalyticsTotalRevenueComponent,
        AnalyticsActivityComponent,
        BrowserUsedTrafficReportsComponent,
        SessionsByCountriesComponent,
        TotalTransactionsComponent,
        TerminalsComponent,
        NewVsReturingComponent,
        AnalyticsGenderComponent,
        VisitorsAgeComponent,
        AnalyticsLanguageComponent,
        ModalHistoricoServiciosComponent,
        SelectTurnosComponent,
        SelectPermisosComponent,
        AutocompleteProductosComponent,
    ],
})
export class commonComponentsModule {}
