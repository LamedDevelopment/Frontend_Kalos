import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-inputnumeric',
    templateUrl: './inputnumeric.component.html',
    styleUrls: ['./inputnumeric.component.scss'],
})
export class InputnumericComponent {
    @Input() control: FormControl;
    @Input() label = '';
    @Input() placeholder = '';
    onInputChange(event: any) {
        const inputValue = event.target.value;
        // Filtrar caracteres no numéricos
        event.target.value = inputValue.replace(/[^0-9]/g, '');
    }
}
