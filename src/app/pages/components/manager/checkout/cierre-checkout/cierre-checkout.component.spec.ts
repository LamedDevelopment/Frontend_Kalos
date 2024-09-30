import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreCheckoutComponent } from './cierre-checkout.component';

describe('CierreCheckoutComponent', () => {
  let component: CierreCheckoutComponent;
  let fixture: ComponentFixture<CierreCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CierreCheckoutComponent]
    });
    fixture = TestBed.createComponent(CierreCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
