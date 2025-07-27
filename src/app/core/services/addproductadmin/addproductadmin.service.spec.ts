import { TestBed } from '@angular/core/testing';

import { AddproductadminService } from './addproductadmin.service';

describe('AddproductadminService', () => {
  let service: AddproductadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddproductadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
