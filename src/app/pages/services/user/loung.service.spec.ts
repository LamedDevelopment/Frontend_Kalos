/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoungService } from './loung.service';

describe('Service: Loung', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoungService]
    });
  });

  it('should ...', inject([LoungService], (service: LoungService) => {
    expect(service).toBeTruthy();
  }));
});
