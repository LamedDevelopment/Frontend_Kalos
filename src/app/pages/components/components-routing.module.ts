import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessModule } from './business/business.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { LoungeModule } from './lounge/lounge.module';
import { ManagerModule } from './manager/manager.module';
import { OwnerModule } from './owner/owner.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { UserModule } from './user/user.module';

import { ComponentsComponent } from './components.component';

const routes: Routes = [
    { path: '', component: ComponentsComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        BusinessModule,
        CollaboratorModule,
        LoungeModule,
        ManagerModule,
        OwnerModule,
        ShowcaseModule,
        UserModule,
    ],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
