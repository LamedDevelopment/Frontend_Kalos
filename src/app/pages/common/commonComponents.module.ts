import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectbussinesComponent } from './selects/selectbussines/selectbussines.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModalappoforaComponent } from './modalappofora/modalappofora.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SelectservicesComponent } from './selects/selectservices/selectservices.component';
import { SelectcollaboratorComponent } from './selects/selectcollaborator/selectcollaborator.component';
import { SelectTypeServicesComponent } from './selects/select-type-services/select-type-services.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectDateServiceComponent } from './selects/select-date-service/select-date-service.component';
import { SelectHoursServiceComponent } from './selects/select-hours-service/select-hours-service.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
    declarations: [
        SelectbussinesComponent,
        ModalappoforaComponent,
        SelectservicesComponent,
        SelectcollaboratorComponent,
        SelectTypeServicesComponent,
        SelectDateServiceComponent,
        SelectHoursServiceComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDatepickerModule,
    ],
    exports: [
        SelectbussinesComponent,
        ModalappoforaComponent,
        SelectservicesComponent,
        SelectcollaboratorComponent,
        SelectTypeServicesComponent,
    ],
})
export class commonComponentsModule {}
