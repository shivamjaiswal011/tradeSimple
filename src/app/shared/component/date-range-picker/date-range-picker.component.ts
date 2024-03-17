import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {

  constructor(private datepicker: MatDatepicker<DateRangePickerComponent>) { }

  ngOnInit(): void {
  }
  open() {
    this.datepicker.open();
  }

}
