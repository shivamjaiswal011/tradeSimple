import { Injectable } from "@angular/core";
import { TradeMetric } from "../interfaces/trade-metrics";
import { AppService } from "./app.service";
import { Account } from "../interfaces/account";

@Injectable({
    providedIn: 'root'
})
export class TradeService {

    closedTradeRowData: any = [];
    openTradeRowData: any = [];
    tradeMetrics: TradeMetric = new TradeMetric();

    selectedAccount: Account | null = new Account();
    constructor(private appService: AppService) {
    }

    initializeTradesData(selectedAccount: Account) {
        console.log("called trades");
        this.cleanTradesData();
        this.initializeClosedTrades(selectedAccount);
        this.initializeOpenTrades(selectedAccount);
    }

    initializeClosedTrades(account: Account) {
        this.appService.getAllClosedTrades(account.accountID).subscribe({
            next: response => {
                if (response.data) {
                    this.closedTradeRowData = response.data;
                    this.tradeMetrics = this.initializeTradeMetrics();
                }
            },
            error: error => {
                console.log(error);
            }
        });
    }

    initializeOpenTrades(account: Account) {

    }

    initializeTradeMetrics(): TradeMetric {
        const tradeMetrics = new TradeMetric();
        this.closedTradeRowData.forEach((element: any) => {
            tradeMetrics.avgHoldingTime += element.holding_time;
            if (element.net_profit >= 0) {
                tradeMetrics.totalWinner++;
                tradeMetrics.grossProfit += element.net_profit
            } else {
                tradeMetrics.totalLooser++;
                tradeMetrics.grossLoss -= element.net_profit
            }
            tradeMetrics.totalProfit += element.net_profit;
            tradeMetrics.expectancy += element.r_multiple;
        });
        tradeMetrics.totalTrades = this.closedTradeRowData.length;
        tradeMetrics.expectancy /= tradeMetrics.totalTrades;
        tradeMetrics.profitFactor = (tradeMetrics.grossProfit / tradeMetrics.grossLoss);
        tradeMetrics.avgHoldingTime /= tradeMetrics.totalTrades;
        tradeMetrics.winPercentage = (tradeMetrics.totalWinner / tradeMetrics.totalTrades) * 100;
        return tradeMetrics;
    }

    cleanTradesData() {
        this.closedTradeRowData = [];
        this.openTradeRowData = [];
        this.tradeMetrics = new TradeMetric();
    }

}