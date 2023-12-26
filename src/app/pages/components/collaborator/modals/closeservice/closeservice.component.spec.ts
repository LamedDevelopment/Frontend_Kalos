import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseserviceComponent } from './closeservice.component';

describe('CloseserviceComponent', () => {
  let component: CloseserviceComponent;
  let fixture: ComponentFixture<CloseserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseserviceComponent]
    });
    fixture = TestBed.createComponent(CloseserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
