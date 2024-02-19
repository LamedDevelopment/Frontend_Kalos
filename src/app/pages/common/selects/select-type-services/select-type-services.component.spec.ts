import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeServicesComponent } from './select-type-services.component';

describe('SelectTypeServicesComponent', () => {
  let component: SelectTypeServicesComponent;
  let fixture: ComponentFixture<SelectTypeServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTypeServicesComponent]
    });
    fixture = TestBed.createComponent(SelectTypeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
