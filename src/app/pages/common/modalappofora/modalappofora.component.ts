import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';
import { ModalserviceComponent } from '../../components/collaborator/modals/modalservice/modalservice.component';
import { ModalservicesService } from '../../services/modalservices.service';
import { AppointmentsService } from '../../services/user/appointments.service';

@Component({
    selector: 'app-modalappofora',
    templateUrl: './modalappofora.component.html',
    styleUrls: ['./modalappofora.component.scss'],
})
export class ModalappoforaComponent {
    startServiceform: FormGroup;
    businessData: any;
    constructor(
        public themeService: CustomizerSettingsService,
        private dialogRef: MatDialogRef<ModalserviceComponent>,
        private _formBuilder: FormBuilder,
        private modalservice: ModalservicesService,
        private _getAppointment: AppointmentsService
    ) {}

    closeDialog() {
        this.dialogRef.close();
    }
}
