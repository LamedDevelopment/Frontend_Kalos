import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTurnosComponent } from './select-turnos.component';

describe('SelectTurnosComponent', () => {
  let component: SelectTurnosComponent;
  let fixture: ComponentFixture<SelectTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTurnosComponent]
    });
    fixture = TestBed.createComponent(SelectTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
