import { TestBed } from '@angular/core/testing';

import { TheSimpsons } from './the-simpsons';

describe('TheSimpsons', () => {
  let service: TheSimpsons;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheSimpsons);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
