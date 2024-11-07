import { TestBed } from '@angular/core/testing';

import { MoneyReceivedService } from './money-received.service';

describe('MoneyReceivedService', () => {
  let service: MoneyReceivedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyReceivedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
