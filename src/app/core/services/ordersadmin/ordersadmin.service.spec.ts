import { TestBed } from '@angular/core/testing';

import { OrdersadminService } from './ordersadmin.service';

describe('OrdersadminService', () => {
  let service: OrdersadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
