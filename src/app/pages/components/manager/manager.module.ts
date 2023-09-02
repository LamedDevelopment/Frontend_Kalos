import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { AgendadayComponent } from './agendaday/agendaday.component';
import { AgendamonthComponent } from './agendamonth/agendamonth.component';
import { AgendaweekComponent } from './agendaweek/agendaweek.component';
import { BillingComponent } from './billing/billing.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CustomerratingComponent } from './customerrating/customerrating.component';
import { CustomersComponent } from './customers/customers.component';
import { DashComponent } from './dash/dash.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { RatingserviceComponent } from './ratingservice/ratingservice.component';
import { ServicesComponent } from './services/services.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ManagerComponent } from './manager.component';
import { AppointmentComponent } from './appointment/appointment.component';


@NgModule({
  declarations: [
    AgendadayComponent,
    AgendamonthComponent,
    AgendaweekComponent,
    BillingComponent,
    CollaboratorComponent,
    CollaboratorsComponent,
    CustomerratingComponent,
    CustomersComponent,
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
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
