import { Component } from '@angular/core';
import { PaymentsModalComponent } from '../../modals/paymentsModal/paymentsModal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-checkout',
  templateUrl: './menu-checkout.component.html',
  styleUrls: ['./menu-checkout.component.scss']
})
export class MenuCheckoutComponent {

  constructor(
    public dialog: MatDialog,
) {}

  openModalPrefactura(
    enterAnimationDuration: string,
    exitAnimationDuration: string
) {
    setTimeout(() => {
        const dialogRef = this.dialog.open(PaymentsModalComponent, {
            width: '1000px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: { showcheck: false },
        });

        dialogRef.afterClosed().subscribe((data) => {
            // Una vez cerrado el modal, puedes acceder a los datos devueltos
        });
    }, 1000);
}

  navigateToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
