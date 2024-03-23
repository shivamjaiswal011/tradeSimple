import { Component, OnInit } from '@angular/core';
import { TradeService } from '../shared/service/trade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(protected tradeService: TradeService) { }

  ngOnInit(): void {
  }

}
