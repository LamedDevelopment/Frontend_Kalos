import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentsModule } from './components/components.module';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../components/authentication/auth/guards/auth.guard';

const routes: Routes = [
    { path: '', component: PagesComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ComponentsModule,
    ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
