import { TestBed } from '@angular/core/testing';

import { SubdistrictService } from './subdistrict.service';

describe('SubdistrictService', () => {
  let service: SubdistrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubdistrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
