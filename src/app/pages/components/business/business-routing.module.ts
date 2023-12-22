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

const routes: Routes = [
    {
        path: 'bus',
        component: BusinessComponent,
        children: [
            { path: 'dash', component: DashComponent },
            { path: 'appoinments', component: AppointmentComponent },
            { path: 'collas', component: CollaboratorsComponent },
            { path: 'manager', component: ManagerComponent },
            { path: 'managers', component: ManagersComponent },
            {
                path: 'services-parameter',
                component: ServicesParameterComponent,
            },
            {
                path: 'services-parameters',
                component: ServicesParametersComponent,
            },
            { path: 'type-service', component: TypeServiceComponent },
            { path: 'type-services', component: TypeServicesComponent },
            { path: 'account', component: AccountComponentBis },
            { path: 'privacy', component: PrivacyPolicyComponentBis },
            { path: 'security', component: SecurityComponentBis },
            { path: 'terms', component: TermsConditionsComponentBis },
            { path: '', redirectTo: '/bus/dash', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BusinessRoutingModule {}
