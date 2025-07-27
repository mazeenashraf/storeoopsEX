import { TestBed } from '@angular/core/testing';

import { UpdateproductadminService } from './updateproductadmin.service';

describe('UpdateproductadminService', () => {
  let service: UpdateproductadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateproductadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
