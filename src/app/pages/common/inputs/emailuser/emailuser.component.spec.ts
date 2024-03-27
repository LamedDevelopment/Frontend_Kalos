import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailuserComponent } from './emailuser.component';

describe('EmailuserComponent', () => {
  let component: EmailuserComponent;
  let fixture: ComponentFixture<EmailuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailuserComponent]
    });
    fixture = TestBed.createComponent(EmailuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
