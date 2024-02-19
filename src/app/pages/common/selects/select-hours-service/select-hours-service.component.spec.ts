import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHoursServiceComponent } from './select-hours-service.component';

describe('SelectHoursServiceComponent', () => {
  let component: SelectHoursServiceComponent;
  let fixture: ComponentFixture<SelectHoursServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectHoursServiceComponent]
    });
    fixture = TestBed.createComponent(SelectHoursServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
