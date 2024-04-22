import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    Observable,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    of,
} from 'rxjs';
import { ManagerService } from 'src/app/pages/services/manager.service';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    /** Componente que busca los productos */
    @Input() ctr: FormControl<any>;
    products: any = [];
    @Output() productSelected = new EventEmitter<any>();

    bussines: any;

    constructor(private managerservice: ManagerService) {}
    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.managerservice.getProducts().subscribe((response: any) => {
            this.products = response.msg;
        });
    }

    onSelectionChange(event: any) {
        this.productSelected.emit({
            propiedad: 'business_selected',
            valor: this.ctr.value,
        });
    }
}
