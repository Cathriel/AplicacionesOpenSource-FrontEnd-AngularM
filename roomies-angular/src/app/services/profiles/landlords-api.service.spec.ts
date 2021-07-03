import { TestBed } from '@angular/core/testing';

import { LandlordsApiService } from './landlords-api.service';

describe('LandlordsApiService', () => {
  let service: LandlordsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandlordsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
