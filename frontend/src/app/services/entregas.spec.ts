import { TestBed } from '@angular/core/testing';

import { Entregas } from './entregas';

describe('Entregas', () => {
  let service: Entregas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Entregas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
