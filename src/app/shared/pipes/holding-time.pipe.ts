import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'holdingTime'
})
export class HoldingTimePipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '-';
    }

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;

    const days = Math.round(value / secondsInDay);
    const remainingSeconds = value % secondsInDay;

    const hours = Math.round(remainingSeconds / secondsInHour);
    const remainingSecondsAfterHours = remainingSeconds % secondsInHour;

    const minutes = Math.round(remainingSecondsAfterHours / secondsInMinute);
    const seconds = Math.round(remainingSecondsAfterHours % secondsInMinute);

    const parts = [];

    if (days > 0) {
      parts.push(`${days}d`);
    }
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0) {
      parts.push(`${minutes}m`);
    }
    if (seconds > 0) {
      parts.push(`${seconds}s`);
    }

    return parts.length > 0 ? parts.join(' ') : '0s';
  }
}
