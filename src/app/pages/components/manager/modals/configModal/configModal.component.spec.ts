import { ComponentFixture, TestBed } from '@angular/core/testing';

import { configModalComponent } from './configModal.component';

describe('configModalComponent', () => {
  let component: configModalComponent;
  let fixture: ComponentFixture<configModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [configModalComponent]
    });
    fixture = TestBed.createComponent(configModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
