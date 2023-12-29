import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { AppointmentComponent } from './appo/appo.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { ManagersComponent } from './managers/managers.component';
import { ManagerComponent } from './manager/manager.component';
import { ServicesParameterComponent } from './services-parameter/services-parameter.component';
import { ServicesParametersComponent } from './services-parameters/services-parameters.component';
import { TypeServiceComponent } from './type-service/type-service.component';
import { TypeServicesComponent } from './type-services/type-services.component';
import { BusinessComponent } from './business.component';
import { AccountComponentBis } from './account/account.component';
import { PrivacyPolicyComponentBis } from './privacy-policy/privacy-policy.component';
import { SecurityComponentBis } from './security/security.component';
import { TermsConditionsComponentBis } from './terms-conditions/terms-conditions.component';
import { AuthGuard } from 'src/app/components/authentication/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'bus',
        component: BusinessComponent, canActivate: [AuthGuard],
        children: [
            { path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
            { path: 'appoinments', component: AppointmentComponent, canActivate: [AuthGuard] },
            { path: 'collas', component: CollaboratorsComponent, canActivate: [AuthGuard] },
            { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard] },
            { path: 'managers', component: ManagersComponent, canActivate: [AuthGuard] },
            {
                path: 'services-parameter',
                component: ServicesParameterComponent, canActivate: [AuthGuard]
            },
            {
                path: 'services-parameters',
                component: ServicesParametersComponent, canActivate: [AuthGuard]
            },
            { path: 'type-service', component: TypeServiceComponent,  canActivate: [AuthGuard] },
            { path: 'type-services', component: TypeServicesComponent, canActivate: [AuthGuard] },
            { path: 'account', component: AccountComponentBis, canActivate: [AuthGuard] },
            { path: 'privacy', component: PrivacyPolicyComponentBis, canActivate: [AuthGuard] },
            { path: 'security', component: SecurityComponentBis, canActivate: [AuthGuard] },
            { path: 'terms', component: TermsConditionsComponentBis, canActivate: [AuthGuard] },
            { path: '', redirectTo: '/bus/dash', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BusinessRoutingModule {}
