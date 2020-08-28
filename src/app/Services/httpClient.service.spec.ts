/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HtppClientService } from './httpClient.service';

describe('Service: HtppClient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtppClientService]
    });
  });

  it('should ...', inject([HtppClientService], (service: HtppClientService) => {
    expect(service).toBeTruthy();
  }));
});
