/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatePickerService } from './date-picker.service';

describe('Service: DatePicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePickerService]
    });
  });

  it('should ...', inject([DatePickerService], (service: DatePickerService) => {
    expect(service).toBeTruthy();
  }));
});
