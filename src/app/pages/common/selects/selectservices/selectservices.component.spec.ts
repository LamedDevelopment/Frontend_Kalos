import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectservicesComponent } from './selectservices.component';

describe('SelectservicesComponent', () => {
  let component: SelectservicesComponent;
  let fixture: ComponentFixture<SelectservicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectservicesComponent]
    });
    fixture = TestBed.createComponent(SelectservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
