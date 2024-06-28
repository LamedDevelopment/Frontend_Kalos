import { Component, Input, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    AbstractControl,
    FormArray,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { ManagerService } from 'src/app/pages/services/manager.service';

@Component({
    selector: 'app-autocomplete-productos',
    templateUrl: './autocomplete-productos.component.html',
    styleUrls: ['./autocomplete-productos.component.scss'],
})
export class AutocompleteProductosComponent implements OnInit {
    @Input() label: string;
    @Input() index: number;
    @Input() formGroup: FormGroup;

    @Input() producto: FormControl<any>;
    filteredStates: Observable<any>;

    productoControl = new FormControl();
    data: any[] = [];

    constructor(
        private managerservice: ManagerService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.filteredStates = of([]);
    }

    onKeyUp() {
        const filterValue = this.productoControl?.value;
        if (filterValue?.length >= 3) {
            this.data = [];
            this.filteredStates = of([]);
            let datauser = JSON.parse(sessionStorage.getItem('dataUser')!);

            let business = {
                business: datauser?.business ? datauser?.business : '',
                nit: datauser?.nit ? datauser?.nit : '',
                nameBusiness: datauser?.businessName
                    ? datauser?.businessName
                    : '',
                tradename: datauser?.branchOffices[0]?.tradeName
                    ? datauser?.branchOffices[0]?.tradeName
                    : '',
            };

            const body = {
                business,
                product: filterValue,
                warehouse: 'bodega_ventas',
            };

            this.managerservice.getProductByAutocomplete(body).subscribe(
                (res: any) => {
                    this.data = res.msg;
                    this.filteredStates = of(this.data);
                },
                (error: any) => {
                    console.error('Error en la llamada al API:', error);
                    this.data = [];
                }
            );
        } else {
            this.data = [];
            this.filteredStates = of([]);
        }
    }

    public productSelect(value: any) {
        this.producto.patchValue(value);
    }
}
