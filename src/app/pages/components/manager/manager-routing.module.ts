import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { DashComponent } from './dash/dash.component';
import { AgendadayComponent } from './agendaday/agendaday.component';
import { AgendamonthComponent } from './agendamonth/agendamonth.component';
import { AgendaweekComponent } from './agendaweek/agendaweek.component';
import { BillingComponent } from './billing/billing.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CustomerratingComponent } from './customerrating/customerrating.component';
import { CustomersComponent } from './customers/customers.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { RatingserviceComponent } from './ratingservice/ratingservice.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AuthGuard } from 'src/app/components/authentication/auth/guards/auth.guard';

const routes: Routes = [
    {
path: 'mana',
        component: ManagerComponent, canActivate: [AuthGuard],
        children: [
            { path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
            { path: 'appo', component: AppointmentComponent, canActivate: [AuthGuard] },
            { path: 'agend', component: AgendadayComponent, canActivate: [AuthGuard] },
            { path: 'agenm', component: AgendamonthComponent, canActivate: [AuthGuard] },
            { path: 'agenw', component: AgendaweekComponent, canActivate: [AuthGuard] },
            { path: 'bill', component: BillingComponent, canActivate: [AuthGuard] },
            { path: 'colla', component: CollaboratorComponent, canActivate: [AuthGuard] },
            { path: 'collas', component: CollaboratorsComponent, canActivate: [AuthGuard] },
            { path: 'cusr', component: CustomerratingComponent, canActivate: [AuthGuard] },
            { path: 'cust', component: CustomersComponent, canActivate: [AuthGuard] },
            { path: 'historico', component: PaymentComponent, canActivate: [AuthGuard] },
            { path: 'mana/mahisap', component: PaymentComponent, canActivate: [AuthGuard] },
            { path: 'payr', component: PayrollComponent, canActivate: [AuthGuard] },
            { path: 'payrl', component: PayrollsComponent, canActivate: [AuthGuard] },
            { path: 'raser', component: RatingserviceComponent, canActivate: [AuthGuard] },
            { path: 'ticket', component: TicketComponent, canActivate: [AuthGuard] },
            { path: 'solicitudes', component: TicketsComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: '/mana/dash', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
