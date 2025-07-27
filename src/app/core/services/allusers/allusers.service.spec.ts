import { TestBed } from '@angular/core/testing';

import { AllusersService } from './allusers.service';

describe('AllusersService', () => {
  let service: AllusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
