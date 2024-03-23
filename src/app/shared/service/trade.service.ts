import { Injectable } from "@angular/core";
import { TradeMetric } from "../interfaces/trade-metrics";
import { SelectedUserAccountService } from "./selected-account-service";
import { AppService } from "./app.service";
import { Account } from "../interfaces/account";

@Injectable({
    providedIn: 'root'
})
export class TradeService {

    closedTradeRowData: any = [];
    openTradeRowData: any = [];
    tradeMetrics: TradeMetric = new TradeMetric();

    constructor(private userAccountService: SelectedUserAccountService, private appService: AppService) {
    }

    initializeTradesData(account: Account) {
        this.cleanTradesData();
        this.initializeClosedTrades(account);
        this.initializeOpenTrades(account);
    }

    initializeClosedTrades(account: Account) {
        this.appService.getAllClosedTrades(account.accountID).subscribe({
            next: response => {
                if (response.data) {
                    this.closedTradeRowData = response.data;
                    this.initializeTradeMetrics();
                }
            },
            error: error => {
                console.log(error);
            }
        });
    }

    initializeOpenTrades(account: Account) {

    }

    initializeTradeMetrics() {
        this.closedTradeRowData.forEach((element: any) => {
            this.tradeMetrics.avgHoldingTime += element.holding_time;
            if (element.net_profit >= 0) {
                this.tradeMetrics.totalWinner++;
                this.tradeMetrics.grossProfit += element.net_profit
            } else {
                this.tradeMetrics.totalLooser++;
                this.tradeMetrics.grossLoss -= element.net_profit
            }
            this.tradeMetrics.totalProfit += element.net_profit;
            this.tradeMetrics.expectancy += element.r_multiple;
        });
        this.tradeMetrics.totalTrades = this.closedTradeRowData.length;
        this.tradeMetrics.expectancy /= this.tradeMetrics.totalTrades;
        this.tradeMetrics.profitFactor = (this.tradeMetrics.grossProfit / this.tradeMetrics.grossLoss);
        this.tradeMetrics.avgHoldingTime /= this.tradeMetrics.totalTrades;
        this.tradeMetrics.winPercentage = (this.tradeMetrics.totalWinner / this.tradeMetrics.totalTrades) * 100;
    }

    cleanTradesData() {
        this.closedTradeRowData = [];
        this.openTradeRowData = [];
        this.tradeMetrics = new TradeMetric();
    }

}