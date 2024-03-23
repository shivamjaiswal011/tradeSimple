import { Injectable } from "@angular/core";
import { TradeMetric } from "../interfaces/trade-metrics";
import { AppService } from "./app.service";
import { Account } from "../interfaces/account";
import { ColDef, GridOptions } from "ag-grid-community";
import { Router } from "@angular/router";
import { RoundPipe } from "../pipes/round.pipe";
import { HoldingTimePipe } from "../pipes/holding-time.pipe";
import { DateFormatPipe } from "../pipes/date-format.pipe";
import { CurrencyPipe } from "../pipes/currency.pipe";

@Injectable({
    providedIn: 'root'
})
export class TradeService {

    closedTradeRowData: any = [];
    openTradeRowData: any = [];
    tradeMetrics: TradeMetric = new TradeMetric();
    public defaultColDef: ColDef = {
        flex: 1,
        minWidth: 100,
        enablePivot: false,
        sortable: true,
        filter: true,
        resizable: true
    }
    tradelogGridOptions: GridOptions<any> | undefined;
    selectedAccount: Account | null = new Account();
    tradelogGridApi: any;
    tradelogGridColumnApi: any;
    tradelogGridParam: any;

    constructor(private appService: AppService, private router: Router) {
        this.tradelogGridOptions = {
            onRowClicked: this.onRowClicked.bind(this)
        };
    }

    dateFormatter(params: any) {
        return new DateFormatPipe().transform(params.value, 'dd MMM yyyy');
    }

    timeFormatter(params: any) {
        return new DateFormatPipe().transform(params.value, 'hh:mm:ss');
    }

    holdingTimeFormatter(params: any) {
        return new HoldingTimePipe().transform(params.value);
    }

    currencyFormatter(params: any) {
        return new CurrencyPipe().transform(params.value, 'INR');
    }

    percentFormatter(params: any) {
        return new RoundPipe().transform(params.value, true);
    }

    numberFormatter(params: any) {
        return new RoundPipe().transform(params.value);
    }

    onTradelogGridReady(params: any) {
        this.tradelogGridParam = params;
        this.tradelogGridApi = params.api;
        this.tradelogGridColumnApi = params.columnApi;
        this.tradelogGridApi.sizeColumnsToFit();
    }

    onRowClicked(event: any): void {
        let rowData: any;
        rowData = event.data;
        this.router.navigate(['individualTrade'], { queryParams: rowData });
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
        this.appService.getAllOpenTrades(account.accountID).subscribe({
            next: response => {
                if (response.data) {
                    this.openTradeRowData = response.data;
                }
            },
            error: error => {
                console.log(error);
            }
        });
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