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

const routes: Routes = [
    {
        path: 'man',
        component: ManagerComponent,
        children: [
            { path: 'dash', component: DashComponent },
            { path: 'appo', component: AppointmentComponent },
            { path: 'agend', component: AgendadayComponent },
            { path: 'agenm', component: AgendamonthComponent },
            { path: 'agenw', component: AgendaweekComponent },
            { path: 'bill', component: BillingComponent },
            { path: 'colla', component: CollaboratorComponent },
            { path: 'collas', component: CollaboratorsComponent },
            { path: 'cusr', component: CustomerratingComponent },
            { path: 'cust', component: CustomersComponent },
            { path: 'pay', component: PaymentComponent },
            { path: 'pays', component: PaymentsComponent },
            { path: 'payr', component: PayrollComponent },
            { path: 'payrl', component: PayrollsComponent },
            { path: 'raser', component: RatingserviceComponent },
            { path: 'ticket', component: TicketComponent },
            { path: 'tickets', component: TicketsComponent },
            { path: '', redirectTo: '/man/dash', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
