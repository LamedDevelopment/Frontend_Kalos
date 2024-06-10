import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoServiciosComponent } from './modal-historico-servicios.component';

describe('ModalHistoricoServiciosComponent', () => {
  let component: ModalHistoricoServiciosComponent;
  let fixture: ComponentFixture<ModalHistoricoServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHistoricoServiciosComponent]
    });
    fixture = TestBed.createComponent(ModalHistoricoServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
