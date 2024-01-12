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
import { AuthGuard } from 'src/app/components/authentication/auth/guards/auth.guard';
import { WalletComponent } from './wallet/wallet.component';
import { SolicitudcollaComponent } from './solicitudcolla/solicitudcolla.component';

const routes: Routes = [
    {
        path: 'colla',
        component: CollaboratorComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dash',
                component: DashComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'appoinments',
                component: AppointmentComponentColl,
                canActivate: [AuthGuard],
            },
            {
                path: 'account',
                component: AccountComponentColl,
                canActivate: [AuthGuard],
            },
            {
                path: 'privacy',
                component: PrivacyPolicyComponentColl,
                canActivate: [AuthGuard],
            },
            {
                path: 'security',
                component: SecurityComponentColl,
                canActivate: [AuthGuard],
            },
            {
                path: 'terms',
                component: TermsConditionsComponentColl,
                canActivate: [AuthGuard],
            },
            {
                path: 'ser',
                component: ServiceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'sers',
                component: ServicesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'ticket',
                component: TicketComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'tickets',
                component: TicketsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'billetera',
                component: WalletComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'hisuap',
                component: HistoricalComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'solicitud',
                component: SolicitudcollaComponent,
                canActivate: [AuthGuard],
            },
            { path: '', redirectTo: '/colla/dash', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CollaboratorRoutingModule {}
