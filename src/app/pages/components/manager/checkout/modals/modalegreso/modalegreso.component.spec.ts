import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalegresoComponent } from './modalegreso.component';

describe('ModalegresoComponent', () => {
  let component: ModalegresoComponent;
  let fixture: ComponentFixture<ModalegresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalegresoComponent]
    });
    fixture = TestBed.createComponent(ModalegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
