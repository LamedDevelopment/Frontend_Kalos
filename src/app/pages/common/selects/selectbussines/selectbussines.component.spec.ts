import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectbussinesComponent } from './selectbussines.component';

describe('SelectbussinesComponent', () => {
  let component: SelectbussinesComponent;
  let fixture: ComponentFixture<SelectbussinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectbussinesComponent]
    });
    fixture = TestBed.createComponent(SelectbussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
