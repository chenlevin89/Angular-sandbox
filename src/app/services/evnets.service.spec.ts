import { TestBed } from '@angular/core/testing';

import { EvnetsService } from './evnets.service';

describe('EvnetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvnetsService = TestBed.get(EvnetsService);
    expect(service).toBeTruthy();
  });
});
