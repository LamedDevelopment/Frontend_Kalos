import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeesupliesComponent } from './seesuplies.component';

describe('SeesupliesComponent', () => {
  let component: SeesupliesComponent;
  let fixture: ComponentFixture<SeesupliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeesupliesComponent]
    });
    fixture = TestBed.createComponent(SeesupliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
