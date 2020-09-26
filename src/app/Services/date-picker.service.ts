import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  constructor(private dateAdapter: NgbDateAdapter<string>) {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  changeStringToDate(jsonDate: string | null): Date {
    const obj = this.dateAdapter.fromModel(jsonDate);
    const dob = obj.year + '-' + obj.month + '-' + obj.day;
    return new Date(Number(Date.parse(dob)));
  }

  calulateAge(dob: Date | null): number {
    const diffms = Date.now() - dob.getTime();
    const agedt = new Date(diffms);
    return Math.abs(agedt.getUTCFullYear() - 1970);
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }

}
