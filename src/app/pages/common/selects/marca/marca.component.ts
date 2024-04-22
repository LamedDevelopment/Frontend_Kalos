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
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    styleUrls: ['./marca.component.scss'],
})
export class MarcaComponent {
    /** Componente que busca la marca de productos */
    @Input() ctr: FormControl<any>;
    @Input() category = '';
    brands: any = [];
    @Output() brandSelected = new EventEmitter<any>();

    bussines: any;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['category'].currentValue != '') {
            this.getBrands();
        }
    }

    constructor(private managerservice: ManagerService) {}
    ngOnInit(): void {
        this.getBrands();
    }

    getBrands() {
        if (this.category.length == 0) {
            return;
        }
        let body = {
            nameCategory: this.category,
        };
        this.managerservice.getBrand(body).subscribe((response: any) => {
            this.brands = response.msg;
        });
    }

    onSelectionChange(event: any) {
        this.brandSelected.emit({
            propiedad: 'brand_selected',
            valor: this.ctr.value,
        });
    }
}
