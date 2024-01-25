import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsModalComponent } from './paymentsModal.component';

describe('PaymentsModalComponent', () => {
  let component: PaymentsModalComponent;
  let fixture: ComponentFixture<PaymentsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsModalComponent]
    });
    fixture = TestBed.createComponent(PaymentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
