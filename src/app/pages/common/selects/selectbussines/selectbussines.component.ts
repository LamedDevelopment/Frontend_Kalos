import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ManagerService } from 'src/app/pages/services/manager.service';

@Component({
    selector: 'app-selectbussines',
    templateUrl: './selectbussines.component.html',
    styleUrls: ['./selectbussines.component.scss'],
})
export class SelectbussinesComponent {
    @Input() ctr: FormControl<any>;
    @Input() branchoffices: any = [];
    @Output() businessSelected = new EventEmitter<any>();

    bussines: any;

    constructor(private managerservice: ManagerService) {}
    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['branchoffices'].currentValue) {
            this.branchoffices = changes['branchoffices'].currentValue;
        }
    }

    onSelectionChange(event: any) {
        this.businessSelected.emit({
            propiedad: 'business_selected',
            valor: this.ctr.value,
        });
    }
}
