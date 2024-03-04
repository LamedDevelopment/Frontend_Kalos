import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalliquidacionComponent } from './modalliquidacion.component';

describe('ModalliquidacionComponent', () => {
  let component: ModalliquidacionComponent;
  let fixture: ComponentFixture<ModalliquidacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalliquidacionComponent]
    });
    fixture = TestBed.createComponent(ModalliquidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
