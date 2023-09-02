import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { AcountComponent } from './acount/acount.component';
import { DashComponent } from './dash/dash.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { LoungeComponent } from '../lounge/lounge.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { ServicesComponent } from './services/services.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            {path: 'appo', component: AppointmentComponent},
            {path: 'acount', component: AcountComponent },
            {path: 'dash', component: DashComponent },
            {path: 'invoiced', component: InvoiceDetailsComponent },
            {path: 'invoicel', component: InvoiceListComponent },
            {path: 'lounges', component: LoungeComponent },
            {path: 'pay', component: PaymentComponent },
            {path: 'pays', component: PaymentsComponent },
            {path: 'profile', component: ProfileComponent },
            {path: 'security', component: SecurityComponent },
            {path: 'services', component: ServicesComponent },
            { path: 'term', component: TermsConditionsComponent },
            { path: '', redirectTo: '/user/appo', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
