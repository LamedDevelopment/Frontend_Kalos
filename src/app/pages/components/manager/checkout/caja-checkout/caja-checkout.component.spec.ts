import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaCheckoutComponent } from './caja-checkout.component';

describe('CajaCheckoutComponent', () => {
  let component: CajaCheckoutComponent;
  let fixture: ComponentFixture<CajaCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CajaCheckoutComponent]
    });
    fixture = TestBed.createComponent(CajaCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
