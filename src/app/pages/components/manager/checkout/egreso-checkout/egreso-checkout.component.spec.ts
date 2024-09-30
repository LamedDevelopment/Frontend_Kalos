import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoCheckoutComponent } from './egreso-checkout.component';

describe('EgresoCheckoutComponent', () => {
  let component: EgresoCheckoutComponent;
  let fixture: ComponentFixture<EgresoCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EgresoCheckoutComponent]
    });
    fixture = TestBed.createComponent(EgresoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
