import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcollaboratorComponent } from './selectcollaborator.component';

describe('SelectcollaboratorComponent', () => {
  let component: SelectcollaboratorComponent;
  let fixture: ComponentFixture<SelectcollaboratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectcollaboratorComponent]
    });
    fixture = TestBed.createComponent(SelectcollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
