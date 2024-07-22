import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/authentication/auth/guards/auth.guard';
import { QrComponent } from 'src/app/shared/pages/qr/qr.component';
import { AnalyticsComponent } from '../../common/analytics/analytics.component';
import { AgendadayComponent } from './agendaday/agendaday.component';
import { AgendamonthComponent } from './agendamonth/agendamonth.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BillingComponent } from './billing/billing.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CustomerratingComponent } from './customerrating/customerrating.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FmAssetsComponent } from './file-manager/fm-assets/fm-assets.component';
import { FmDocumentsComponent } from './file-manager/fm-documents/fm-documents.component';
import { FmMediaComponent } from './file-manager/fm-media/fm-media.component';
import { FmPersonalComponent } from './file-manager/fm-personal/fm-personal.component';
import { FmProjectsComponent } from './file-manager/fm-projects/fm-projects.component';
import { FmRecentFilesComponent } from './file-manager/fm-recent-files/fm-recent-files.component';
import { FmTemplatesComponent } from './file-manager/fm-templates/fm-templates.component';
import { GeneralConfComponent } from './general-conf/general-conf.component';
import { ManagerComponent } from './manager.component';
import { PaymentComponent } from './payment/payment.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollsComponent } from './payrolls/payrolls.component';
import { RatingserviceComponent } from './ratingservice/ratingservice.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ViewAllCollaComponent } from './view-all-colla/view-all-colla.component';
import { WalletComponent } from './wallet/wallet.component';
import { SeesupliesComponent } from './seesuplies/seesuplies.component';

const routes: Routes = [
    {
        path: 'man',
        component: ManagerComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dash',
                component: AnalyticsComponent,
                canActivate: [AuthGuard],
            },

            {
                path: 'appo',
                component: AppointmentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'agend',
                component: AgendadayComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'agenm',
                component: AgendamonthComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'wallet',
                component: WalletComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'bill',
                component: BillingComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'colla',
                component: CollaboratorComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'collas',
                component: CollaboratorsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'cusr',
                component: CustomerratingComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'general-conf',
                component: GeneralConfComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'pay',
                component: PaymentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'payr',
                component: PayrollComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'payrl',
                component: PayrollsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'raser',
                component: RatingserviceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'hist-solicitudes',
                component: TicketComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'solicitudes',
                component: TicketsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'qr',
                component: QrComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager',
                component: FileManagerComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager/cv',
                component: FmAssetsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager/salud',
                component: FmProjectsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager/general',
                component: FmPersonalComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager/templates',
                component: FmTemplatesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager/documents',
                component: FmDocumentsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager/media',
                component: FmMediaComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'file-manager/recent-files',
                component: FmRecentFilesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'viewall-colla',
                component: ViewAllCollaComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'see-supplies',
                component: SeesupliesComponent,
                canActivate: [AuthGuard],
            },
            { path: '', redirectTo: '/man/appo', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}
