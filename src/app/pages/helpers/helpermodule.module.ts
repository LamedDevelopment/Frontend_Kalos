import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputnumericComponent } from './inputnumeric/inputnumeric.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';

@NgModule({
    declarations: [InputnumericComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NgxCurrencyDirective,
        ReactiveFormsModule,
    ],
    exports: [InputnumericComponent],
})
export class HelpermoduleModule {}
