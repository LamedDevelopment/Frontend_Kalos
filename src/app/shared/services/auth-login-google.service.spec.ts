import { TestBed } from '@angular/core/testing';

import { AuthLoginGoogleService } from './auth-login-google.service';

describe('AuthLoginGoogleService', () => {
  let service: AuthLoginGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLoginGoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
