import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectbussinesComponent } from './selects/selectbussines/selectbussines.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModalappoforaComponent } from './modalappofora/modalappofora.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SelectservicesComponent } from './selects/selectservices/selectservices.component';
import { SelectcollaboratorComponent } from './selects/selectcollaborator/selectcollaborator.component';
import { SelectTypeServicesComponent } from './selects/select-type-services/select-type-services.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectDateServiceComponent } from './selects/select-date-service/select-date-service.component';
import { SelectHoursServiceComponent } from './selects/select-hours-service/select-hours-service.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalappomanagerComponent } from './modalappomanager/modalappomanager.component';
import { EmailuserComponent } from './inputs/emailuser/emailuser.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductComponent } from './selects/product/product.component';
import { MarcaComponent } from './selects/marca/marca.component';
import { ReferenceComponent } from './selects/reference/reference.component';
import { SelectpaymethodComponent } from './selects/selectpaymethod/selectpaymethod.component';
import { WelcomeDashboardComponent } from './analytics/welcome-dashboard/welcome-dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsStatusComponent } from './analytics/analytics-status/analytics-status.component';
import { AnalyticsStatsComponent } from './analytics/analytics-stats/analytics-stats.component';
import { AnalyticsAudienceOverviewComponent } from './analytics/analytics-audience-overview/analytics-audience-overview.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SalesAnalyticsComponent } from './analytics/sales-analytics/sales-analytics.component';
import { RevenueReportComponent } from './analytics/revenue-report/revenue-report.component';
import { AnalyticsTotalRevenueComponent } from './analytics/analytics-total-revenue/analytics-total-revenue.component';
import { AnalyticsActivityComponent } from './analytics/analytics-activity/analytics-activity.component';
import { BrowserUsedTrafficReportsComponent } from './analytics/browser-used-traffic-reports/browser-used-traffic-reports.component';
import { SessionsByCountriesComponent } from './analytics/sessions-by-countries/sessions-by-countries.component';
import { TotalTransactionsComponent } from './analytics/total-transactions/total-transactions.component';
import { TerminalsComponent } from './analytics/terminals/terminals.component';
import { NewVsReturingComponent } from './analytics/new-vs-returing/new-vs-returing.component';
import { AnalyticsGenderComponent } from './analytics/analytics-gender/analytics-gender.component';
import { VisitorsAgeComponent } from './analytics/visitors-age/visitors-age.component';
import { AnalyticsLanguageComponent } from './analytics/analytics-language/analytics-language.component';
import { SessionsDeviceComponent } from './analytics/sessions-device/sessions-device.component';

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
        AnalyticsComponent,
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
        AnalyticsComponent,
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
    ],
})
export class commonComponentsModule {}
