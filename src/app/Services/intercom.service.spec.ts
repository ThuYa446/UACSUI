/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntercomService } from './intercom.service';

describe('Service: Intercom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntercomService]
    });
  });

  it('should ...', inject([IntercomService], (service: IntercomService) => {
    expect(service).toBeTruthy();
  }));
});
