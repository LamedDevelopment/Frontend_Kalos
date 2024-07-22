import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuppliesComponent } from './modal-supplies.component';

describe('ModalSuppliesComponent', () => {
  let component: ModalSuppliesComponent;
  let fixture: ComponentFixture<ModalSuppliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSuppliesComponent]
    });
    fixture = TestBed.createComponent(ModalSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
