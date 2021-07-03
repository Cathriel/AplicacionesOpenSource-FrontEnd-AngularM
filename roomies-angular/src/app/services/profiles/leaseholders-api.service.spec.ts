import { TestBed } from '@angular/core/testing';

import { LeaseholdersApiService } from './leaseholders-api.service';

describe('LeaseholdersApiService', () => {
  let service: LeaseholdersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseholdersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
