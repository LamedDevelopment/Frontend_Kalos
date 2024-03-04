import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksloansComponent } from './checksloans.component';

describe('ChecksloansComponent', () => {
  let component: ChecksloansComponent;
  let fixture: ComponentFixture<ChecksloansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecksloansComponent]
    });
    fixture = TestBed.createComponent(ChecksloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
