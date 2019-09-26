import { TestBed } from '@angular/core/testing';

import { ExampleThreeService } from './example-three.service';

describe('ExampleThreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleThreeService = TestBed.get(ExampleThreeService);
    expect(service).toBeTruthy();
  });
});
