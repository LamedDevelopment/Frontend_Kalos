import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ticketsModalComponent } from './ticketsModal.component';

describe('PaymentsModalComponent', () => {
  let component: ticketsModalComponent;
  let fixture: ComponentFixture<ticketsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ticketsModalComponent]
    });
    fixture = TestBed.createComponent(ticketsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
