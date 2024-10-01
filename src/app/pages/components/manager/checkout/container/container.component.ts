import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
    @Input() componente: any; // Recibe un componente
    @Input() titulo: string;
}
