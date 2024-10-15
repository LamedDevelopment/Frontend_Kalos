import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnticiposCheckoutComponent } from './anticipos-checkout.component';

describe('AnticiposCheckoutComponent', () => {
  let component: AnticiposCheckoutComponent;
  let fixture: ComponentFixture<AnticiposCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnticiposCheckoutComponent]
    });
    fixture = TestBed.createComponent(AnticiposCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
