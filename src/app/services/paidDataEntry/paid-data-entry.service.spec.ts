import { TestBed } from '@angular/core/testing';

import { PaidDataEntryService } from './paid-data-entry.service';

describe('PaidDataEntryService', () => {
  let service: PaidDataEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaidDataEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
