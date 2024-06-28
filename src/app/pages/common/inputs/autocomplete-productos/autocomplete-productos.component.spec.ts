import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteProductosComponent } from './autocomplete-productos.component';

describe('AutocompleteProductosComponent', () => {
  let component: AutocompleteProductosComponent;
  let fixture: ComponentFixture<AutocompleteProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteProductosComponent]
    });
    fixture = TestBed.createComponent(AutocompleteProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
