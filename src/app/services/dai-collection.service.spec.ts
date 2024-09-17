import { TestBed } from '@angular/core/testing';

import { DaiCollectionService } from './dai-collection.service';

describe('DaiCollectionService', () => {
  let service: DaiCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaiCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
