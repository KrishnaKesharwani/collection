import { TestBed } from '@angular/core/testing';

import { VcManagementService } from './vc-management.service';

describe('VcManagementService', () => {
  let service: VcManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
