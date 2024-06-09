import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescripcionServicioComponent } from './modal-descripcion-servicio.component';

describe('ModalDescripcionServicioComponent', () => {
  let component: ModalDescripcionServicioComponent;
  let fixture: ComponentFixture<ModalDescripcionServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDescripcionServicioComponent]
    });
    fixture = TestBed.createComponent(ModalDescripcionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
