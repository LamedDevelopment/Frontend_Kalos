import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPermisosComponent } from './select-permisos.component';

describe('SelectPermisosComponent', () => {
  let component: SelectPermisosComponent;
  let fixture: ComponentFixture<SelectPermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectPermisosComponent]
    });
    fixture = TestBed.createComponent(SelectPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
