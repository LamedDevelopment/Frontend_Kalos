import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTurnosComponent } from './config-turnos.component';

describe('ConfigTurnosComponent', () => {
  let component: ConfigTurnosComponent;
  let fixture: ComponentFixture<ConfigTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigTurnosComponent]
    });
    fixture = TestBed.createComponent(ConfigTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
