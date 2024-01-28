import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalappoforaComponent } from './modalappofora.component';

describe('ModalappoforaComponent', () => {
  let component: ModalappoforaComponent;
  let fixture: ComponentFixture<ModalappoforaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalappoforaComponent]
    });
    fixture = TestBed.createComponent(ModalappoforaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
