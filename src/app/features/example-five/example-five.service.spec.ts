import { TestBed } from '@angular/core/testing';

import { ExampleFiveService } from './example-five.service';

describe('ExampleFiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleFiveService = TestBed.get(ExampleFiveService);
    expect(service).toBeTruthy();
  });
});
