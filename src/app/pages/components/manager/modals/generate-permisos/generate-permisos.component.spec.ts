import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePermisosComponent } from './generate-permisos.component';

describe('GeneratePermisosComponent', () => {
  let component: GeneratePermisosComponent;
  let fixture: ComponentFixture<GeneratePermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratePermisosComponent]
    });
    fixture = TestBed.createComponent(GeneratePermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
