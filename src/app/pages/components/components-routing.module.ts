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
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/components/authentication/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
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
    exports: [RouterModule],
})
export class ComponentsRoutingModule {}
