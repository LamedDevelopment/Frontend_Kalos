import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanmodalComponent } from './loanmodal.component';

describe('LoanmodalComponent', () => {
  let component: LoanmodalComponent;
  let fixture: ComponentFixture<LoanmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanmodalComponent]
    });
    fixture = TestBed.createComponent(LoanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
