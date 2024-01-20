import { TestBed } from '@angular/core/testing';

import { FlightDataClientService } from './flight-data-client.service';

describe('FlightDataClientService', () => {
  let service: FlightDataClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightDataClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
