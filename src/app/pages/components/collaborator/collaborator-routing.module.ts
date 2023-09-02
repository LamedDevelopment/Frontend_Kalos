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

const routes: Routes = [
    {
        path: 'colla',
        component: CollaboratorComponent,
        children: [
            { path: 'dash', component: DashComponent },
            { path: 'his', component: HistoricalComponent },
            { path: 'pay', component: PaymentComponent },
            { path: 'pays', component: PaymentsComponent },
            { path: 'payr', component: PayrollComponent },
            { path: 'payrs', component: PayrollsComponent },
            { path: 'ser', component: ServiceComponent },
            { path: 'sers', component: ServicesComponent },
            { path: 'ticket', component: TicketComponent },
            { path: 'tickets', component: TicketsComponent },
            { path: '', redirectTo: '/colla/dash', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorRoutingModule { }
