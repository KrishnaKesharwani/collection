import { TestBed } from '@angular/core/testing';

import { CustomActionsService } from './custom-actions.service';

describe('CustomActionsService', () => {
  let service: CustomActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
