import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AcountComponent } from './acount/acount.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DashComponent } from './dash/dash.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { LoungesComponent } from './lounges/lounges.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { ServicesComponent } from './services/services.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    AcountComponent,
    AppointmentComponent,
    DashComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,
    LoungesComponent,
    PaymentComponent,
    PaymentsComponent,
    ProfileComponent,
    SecurityComponent,
    ServicesComponent,
    TermsConditionsComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
