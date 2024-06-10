import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentDialogBoxComponent } from './create-document-dialog-box.component';

describe('CreateDocumentDialogBoxComponent', () => {
  let component: CreateDocumentDialogBoxComponent;
  let fixture: ComponentFixture<CreateDocumentDialogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDocumentDialogBoxComponent]
    });
    fixture = TestBed.createComponent(CreateDocumentDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
