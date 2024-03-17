import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'INR'): string {
    if (isNaN(value) || value === null || value === undefined) {
      return '-';
    }

    // Round the value to two decimal places
    const roundedValue = Math.round(value * 100) / 100;

    // Use built-in Intl.NumberFormat to format the currency
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(roundedValue);
  }
}
