import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, isPercentage: boolean = false): string | null {
    if (isNaN(value) || value === null || value === undefined) {
      return null;
    }

    // Round the value to two decimal places
    const roundedValue = Math.round(value * 100) / 100;

    // Append '%' if isPercentage is true, otherwise return rounded value as is
    return isPercentage ? roundedValue + '%' : roundedValue.toString();
  }
}
