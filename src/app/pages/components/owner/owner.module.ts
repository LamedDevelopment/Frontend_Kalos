import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { BillingComponent } from './billing/billing.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { DashComponent } from './dash/dash.component';
import { HistoricalComponent } from './historical/historical.component';
import { LoungeComponent } from './lounge/lounge.component';
import { LoungesComponent } from './lounges/lounges.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { RatingserviceComponent } from './ratingservice/ratingservice.component';
import { ServicesComponent } from './services/services.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { OwnerComponent } from './owner.component';


@NgModule({
  declarations: [
    BillingComponent,
    CollaboratorComponent,
    CollaboratorsComponent,
    CustomerComponent,
    CustomersComponent,
    DashComponent,
    HistoricalComponent,
    LoungeComponent,
    LoungesComponent,
    PaymentComponent,
    PaymentsComponent,
    PayrollComponent,
    PayrollsComponent,
    RatingserviceComponent,
    ServicesComponent,
    TicketComponent,
    TicketsComponent,
    OwnerComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
