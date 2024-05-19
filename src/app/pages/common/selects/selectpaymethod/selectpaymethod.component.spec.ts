import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectpaymethodComponent } from './selectpaymethod.component';

describe('SelectpaymethodComponent', () => {
  let component: SelectpaymethodComponent;
  let fixture: ComponentFixture<SelectpaymethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectpaymethodComponent]
    });
    fixture = TestBed.createComponent(SelectpaymethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
