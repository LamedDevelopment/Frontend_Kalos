import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterqrComponent } from './registerqr.component';

describe('RegisterqrComponent', () => {
  let component: RegisterqrComponent;
  let fixture: ComponentFixture<RegisterqrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterqrComponent]
    });
    fixture = TestBed.createComponent(RegisterqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
