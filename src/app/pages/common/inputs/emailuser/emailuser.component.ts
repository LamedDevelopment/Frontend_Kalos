import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    debounceTime,
    distinctUntilChanged,
    Observable,
    of,
    switchMap,
} from 'rxjs';
import { AppointmentsService } from 'src/app/pages/services/user/appointments.service';

@Component({
    selector: 'app-emailuser',
    templateUrl: './emailuser.component.html',
    styleUrls: ['./emailuser.component.scss'],
})
export class EmailuserComponent {
    /** Componente que busca usuario por Email */
    @Input() emailctr: FormControl;
    @Input() label: string;
    @Output() userSelected = new EventEmitter<any>();
    filteredAliados: Observable<any>;
    data_aliados: any[] = [];
    constructor(private appointmentsService: AppointmentsService) {}

    ngOnInit(): void {
        this.filteredAliados = this.emailctr.valueChanges.pipe(
            debounceTime(500), // Espera 500ms después de que el usuario deja de escribir
            distinctUntilChanged(),
            switchMap((value) => this.filterAliados(value))
        );
    }

    filterAliados(value: string): Observable<any[]> {
        if (value.length > 10) {
            const body = { emailUser: value };
            return this.appointmentsService.getUserByEmail(body).pipe(
                switchMap((res: any) => {
                    if (res.ok) {
                        const obj = {
                            name: res?.msg?.name,
                            value: res?.msg?.uid,
                        };
                        this.data_aliados = [obj];
                        return of(this.data_aliados);
                    } else {
                        return of([]);
                    }
                })
            );
        } else {
            return of([]);
        }
    }

    public AliadoSelect(item: any) {
        this.filteredAliados = of([]);
        console.log(item);
        this.userSelected.emit({
            propiedad: 'user_seleccionado',
            valor: item?.value,
        });
    }
}
