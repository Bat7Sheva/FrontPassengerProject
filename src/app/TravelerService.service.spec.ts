import { TestBed } from '@angular/core/testing';

import { TravelerService } from './Traveler.service';

describe('TravelerService', () => {
  let service: TravelerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
