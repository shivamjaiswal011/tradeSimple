import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string, timeZone: string = 'UTC'): any {
    if (!value) return ''; // Handle null or undefined value
    const date = new Date(value);
    const adjustedDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(adjustedDate, format);
  }
}