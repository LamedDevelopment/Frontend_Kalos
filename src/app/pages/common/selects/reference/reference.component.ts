import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    debounceTime,
    distinctUntilChanged,
    Observable,
    of,
    switchMap,
} from 'rxjs';
import { ManagerService } from 'src/app/pages/services/manager.service';

@Component({
    selector: 'app-reference',
    templateUrl: './reference.component.html',
    styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent {
    /** Componente que busca la marca de productos */
    @Input() ctr: FormControl<any>;
    @Input() category = '';
    @Input() brandName = '';
    reference: any = [];
    @Output() referenceSelected = new EventEmitter<any>();

    filteredAliados: Observable<any>;
    constructor(private managerservice: ManagerService) {}
    ngOnInit(): void {
        this.filteredAliados = this.ctr.valueChanges.pipe(
            debounceTime(1000), // Espera 500ms después de que el usuario deja de escribir
            distinctUntilChanged(),
            switchMap((value) => this.filterReference(value))
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        /* if (changes['brandName']?.currentValue != '') {
            this.filterReference(this.ctr.value);
        } */
    }

    filterReference(value: string): Observable<any[]> {
        if (value.length > 1) {
            if (this.category == '' || this.brandName == '') {
                return of([]);
            }

            let body = {
                nameCategory: this.category,
                brandName: this.brandName,
                reference: this.ctr.value,
            };
            return this.managerservice.getReference(body).pipe(
                switchMap((res: any) => {
                    if (res.ok) {
                        console.log(res);

                        const obj = {
                            name: res?.msg?.spanishDescription,
                            value: res?.msg?._id,
                        };
                        this.reference = res.msg;
                        return of(this.reference);
                    } else {
                        return of([]);
                    }
                })
            );
        } else {
            return of([]);
        }
    }

    onSelectionChange(item: any) {
        this.filteredAliados = of([]);
        this.referenceSelected.emit({
            propiedad: 'reference_selected',
            valor: item?.reference,
        });
    }
}
