import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCheckoutComponent } from './balance-checkout.component';

describe('BalanceCheckoutComponent', () => {
  let component: BalanceCheckoutComponent;
  let fixture: ComponentFixture<BalanceCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceCheckoutComponent]
    });
    fixture = TestBed.createComponent(BalanceCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
