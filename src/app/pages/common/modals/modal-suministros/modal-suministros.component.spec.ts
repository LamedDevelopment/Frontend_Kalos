import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuministrosComponent } from './modal-suministros.component';

describe('ModalSuministrosComponent', () => {
  let component: ModalSuministrosComponent;
  let fixture: ComponentFixture<ModalSuministrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSuministrosComponent]
    });
    fixture = TestBed.createComponent(ModalSuministrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
