import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorComponent } from './collaborator.component';
import { DashComponent } from './dash/dash.component';
import { HistoricalComponent } from './historical/historical.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { ServiceComponent } from './service/service.component';
import { ServicesComponent } from './services/services.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AppointmentComponentColl } from './appo/appo.component';
import { AccountComponentColl } from './account/account.component';
import { PrivacyPolicyComponentColl } from './privacy-policy/privacy-policy.component';
import { SecurityComponentColl } from './security/security.component';
import { TermsConditionsComponentColl } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
    {
        path: 'colla',
        component: CollaboratorComponent,
        children: [
            { path: 'dash', component: DashComponent },
            { path: 'appoinments', component: AppointmentComponentColl },
            { path: 'account', component: AccountComponentColl },
            { path: 'privacy', component: PrivacyPolicyComponentColl },
            { path: 'security', component: SecurityComponentColl },
            { path: 'terms', component: TermsConditionsComponentColl },
            { path: 'ser', component: ServiceComponent },
            { path: 'sers', component: ServicesComponent },
            { path: 'ticket', component: TicketComponent },
            { path: 'tickets', component: TicketsComponent },
            { path: '', redirectTo: '/colla/dash', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CollaboratorRoutingModule {}
