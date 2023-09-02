import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { DashComponent } from './dash/dash.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagersComponent } from './managers/managers.component';
import { ServicesParameterComponent } from './services-parameter/services-parameter.component';
import { ServicesParametersComponent } from './services-parameters/services-parameters.component';
import { TypeServiceComponent } from './type-service/type-service.component';
import { TypeServicesComponent } from './type-services/type-services.component';
import { BusinessComponent } from './business.component';


@NgModule({
  declarations: [
    CollaboratorComponent,
    CollaboratorsComponent,
    DashComponent,
    ManagerComponent,
    ManagersComponent,
    ServicesParameterComponent,
    ServicesParametersComponent,
    TypeServiceComponent,
    TypeServicesComponent,
    BusinessComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule
  ]
})
export class BusinessModule { }
