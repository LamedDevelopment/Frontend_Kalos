import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-checksloans',
    templateUrl: './checksloans.component.html',
    styleUrls: ['./checksloans.component.scss'],
})
export class ChecksloansComponent {
    @Input() item: any;
    @Input() title: any;
}
