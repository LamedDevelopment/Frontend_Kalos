import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalappomanagerComponent } from './modalappomanager.component';

describe('ModalappomanagerComponent', () => {
  let component: ModalappomanagerComponent;
  let fixture: ComponentFixture<ModalappomanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalappomanagerComponent]
    });
    fixture = TestBed.createComponent(ModalappomanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
