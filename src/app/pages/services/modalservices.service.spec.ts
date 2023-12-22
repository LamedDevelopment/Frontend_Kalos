import { TestBed } from '@angular/core/testing';

import { ModalservicesService } from './modalservices.service';

describe('ModalservicesService', () => {
  let service: ModalservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
