import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReasignacionComponent } from './modal-modal-reasignacion.component';

describe('ModalReasignacionComponent', () => {
  let component: ModalReasignacionComponent;
  let fixture: ComponentFixture<ModalReasignacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalReasignacionComponent]
    });
    fixture = TestBed.createComponent(ModalReasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
