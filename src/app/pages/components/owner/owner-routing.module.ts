import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { DashComponent } from './dash/dash.component';
import { BillingComponent } from './billing/billing.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
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

const routes: Routes = [
    {
        path: 'own',
        component: OwnerComponent,
        // canActivate: [AuthGuard]
        children: [
            { path: 'dash', component: DashComponent },
            { path: 'bill', component: BillingComponent  },
            { path: 'colla', component: CollaboratorComponent },
            { path: 'collas', component: CollaboratorsComponent },
            { path: 'cust', component: CustomerComponent },
            { path: 'custs', component: CustomersComponent },
            { path: 'his', component: HistoricalComponent  },
            { path: 'loung', component: LoungeComponent },
            { path: 'loungs', component: LoungesComponent },
            { path: 'pay', component: PaymentComponent },
            { path: 'pays', component: PaymentsComponent },
            { path: 'payr', component: PayrollComponent },
            { path: 'payrs', component: PayrollsComponent  },
            { path: 'raser', component: RatingserviceComponent },
            { path: 'serv', component: ServicesComponent },
            { path: 'ticket', component: TicketComponent  },
            { path: 'tickets', component: TicketsComponent },
            { path: '', redirectTo: '/own/dash', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
