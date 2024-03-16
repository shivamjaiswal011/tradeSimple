import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../shared/service/app.service';
import { ClosedTrade } from '../shared/interfaces/closed-trade';

@Component({
  selector: 'app-individual-trade',
  templateUrl: './individual-trade.component.html',
  styleUrls: ['./individual-trade.component.css']
})
export class IndividualTradeComponent implements OnInit {
  trade: any;
  transactions: any = [];
  netProfit: number = 0;
  rMultiple: number = 0;
  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.trade = params;
      this.netProfit = (this.trade.avg_sell_price - this.trade.avg_buy_price) * this.trade.quantity;
    });


    this.appService.getAllTransactionForThisTrade(this.trade.trade_id, "closed").subscribe({
      next: response => {
        if (response.Data) {
          this.transactions = response.Data;
          console.log(response.Data);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
