import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudcollaComponent } from './solicitudcolla.component';

describe('SolicitudcollaComponent', () => {
  let component: SolicitudcollaComponent;
  let fixture: ComponentFixture<SolicitudcollaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudcollaComponent]
    });
    fixture = TestBed.createComponent(SolicitudcollaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
