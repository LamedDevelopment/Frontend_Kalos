import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCollaComponent } from './view-all-colla.component';

describe('ViewAllCollaComponent', () => {
  let component: ViewAllCollaComponent;
  let fixture: ComponentFixture<ViewAllCollaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllCollaComponent]
    });
    fixture = TestBed.createComponent(ViewAllCollaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
