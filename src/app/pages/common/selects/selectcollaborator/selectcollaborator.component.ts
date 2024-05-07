import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalserviceComponent } from 'src/app/pages/components/collaborator/modals/modalservice/modalservice.component';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { CustomizerSettingsService } from 'src/app/shared/services/customizer-settings.service';

@Component({
    selector: 'app-selectcollaborator',
    templateUrl: './selectcollaborator.component.html',
    styleUrls: ['./selectcollaborator.component.scss'],
})
export class SelectcollaboratorComponent {
    dataCollaborators: any = [];
    @Input() ctr: FormControl;
    @Input() idbusiness: any = '';
    @Input() services: any = '';
    @Input() tradename: any = '';
    @Output() collaSelected = new EventEmitter<any>();
    optionselected = '';
    valueInput: any;
    constructor(private managerservice: ManagerService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['services']) {
            this.getColla();
        }
    }

    getColla() {
        if (
            this.idbusiness == '' ||
            this.services == '' ||
            this.tradename == ''
        ) {
            return;
        }
        console.log(
            this.idbusiness,
            this.services,
            this.tradename,
            'get colla'
        );
        let body = {
            business: this.idbusiness,
            services: this.services,
            tradename: this.tradename,
        };
        this.managerservice
            .getCollaborators('bus/seecolla', body)
            .subscribe((response: any) => {
                this.dataCollaborators = response.msg;
            });
    }

    onCollaChange(event: any) {
        this.valueInput = this.collaSelected.emit({
            propiedad: 'business_selected',
            valor: this.valueInput,
        });
        this.valueInput = this.valueInput;
    }
}
