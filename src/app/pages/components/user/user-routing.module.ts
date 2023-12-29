import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { AccountComponent } from './account/account.component';
import { DashComponent } from './dash/dash.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { LoungeComponent } from '../lounge/lounge.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { UserComponent } from './user.component';
import { SecurityComponent } from './security/security.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AuthGuard } from 'src/app/components/authentication/auth/guards/auth.guard';
import { HistoricoListComponent } from './history/history.component';


const routes: Routes = [
    {
        path: 'user',
        component: UserComponent, canActivate: [AuthGuard],
        children: [
            {path: 'appo', component: AppointmentComponent, canActivate: [AuthGuard]},
            {path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
            {path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
            {path: 'hisuap', component: HistoricoListComponent, canActivate: [AuthGuard] },
            {path: 'billetera', component: InvoiceListComponent, canActivate: [AuthGuard] },
            {path: 'lounges', component: LoungeComponent, canActivate: [AuthGuard] },
            /* {path: 'pay', component: PaymentComponent },
            {path: 'pays', component: PaymentsComponent }, */
            {path: 'privacy', component: PrivacyPolicyComponent, canActivate: [AuthGuard] },
            {path: 'security', component: SecurityComponent, canActivate: [AuthGuard] },
            /* {path: 'services', component: ServicesComponent }, */
            { path: 'terms', component: TermsConditionsComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: '/user/appo', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
