import { TestBed } from '@angular/core/testing';

import { ProxyAPIService } from './proxy-api.service';

describe('ProxyAPIService', () => {
  let service: ProxyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProxyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
