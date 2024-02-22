import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-sizing',
  templateUrl: './position-sizing.component.html',
  styleUrls: ['./position-sizing.component.css']
})
export class PositionSizingComponent implements OnInit {

  constructor() { }
  equityModel: any;
  positionSizingModel: string = '';
  totalEquity: any;
  percentRisk: any;
  oneR: any;
  amountRisk: any;
  sharesToBuy: number = 0;

  ngOnInit(): void {
  }

  onSubmit() {
    this.amountRisk = this.totalEquity * (this.percentRisk / 100);
    this.sharesToBuy = this.amountRisk / this.oneR;
  }

}
