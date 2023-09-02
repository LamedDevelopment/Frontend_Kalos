import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentsModule } from './components/components.module';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    { path: '', component: PagesComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ComponentsModule,
    ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
