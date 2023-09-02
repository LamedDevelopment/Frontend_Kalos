import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { DashComponent } from './dash/dash.component';
import { HistoricalComponent } from './historical/historical.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { ServiceComponent } from './service/service.component';
import { ServicesComponent } from './services/services.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { WalletComponent } from './wallet/wallet.component';
import { CollaboratorComponent } from './collaborator.component';


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
    CollaboratorComponent
  ],
  imports: [
    CommonModule,
    CollaboratorRoutingModule
  ]
})
export class CollaboratorModule { }
