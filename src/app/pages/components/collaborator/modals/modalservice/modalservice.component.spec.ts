import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalserviceComponent } from './modalservice.component';

describe('ModalserviceComponent', () => {
  let component: ModalserviceComponent;
  let fixture: ComponentFixture<ModalserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalserviceComponent]
    });
    fixture = TestBed.createComponent(ModalserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
