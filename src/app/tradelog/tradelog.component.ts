import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, GridOptions } from 'ag-grid-community';
import { SelectedAccountService } from '../shared/service/selected-account-service';
import { AppService } from '../shared/service/app.service';
import { Router } from '@angular/router';
import { TradeMetric } from '../shared/interfaces/trade-metrics';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { HoldingTimePipe } from '../shared/pipes/holding-time.pipe';
import { CurrencyPipe } from '../shared/pipes/currency.pipe';
import { RoundPipe } from '../shared/pipes/round.pipe';

@Component({
  selector: 'app-tradelog',
  templateUrl: './tradelog.component.html',
  styleUrls: ['./tradelog.component.css']
})
export class TradelogComponent implements OnInit {
  tradelogGridParam: any;
  closedTradeRowData: any = [];
  openTradeRowData: any = [];
  accountID: string = '';
  tradeMetrics: TradeMetric = new TradeMetric();

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    enablePivot: false,
    sortable: true,
    filter: true,
    resizable: true
  }

  colDefs: ColDef[] = [
    {
      headerName: "Symbol",
      field: "symbol",
      width: 300
    },
    {
      headerName: "Quantity",
      field: "quantity",
      width: 300
    },
    {
      headerName: "Buy Price",
      field: "avg_buy_price",
      width: 300,
      valueFormatter: this.currencyFormatter,
    },
    {
      headerName: "Sell Price",
      field: "avg_sell_price",
      width: 300,
      valueFormatter: this.currencyFormatter,
    },
    {
      headerName: "Profit/Loss %",
      field: "profit_percentage",
      width: 300,
      valueFormatter: this.percentFormatter,
    },
    {
      headerName: "R-Multiple",
      field: "r_multiple",
      width: 300,
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: "Holding time",
      field: "holding_time",
      width: 300,
      valueFormatter: this.holdingTimeFormatter,
    },
    {
      headerName: "Opened Date",
      field: "open_timestamp",
      width: 300,
      valueFormatter: this.dateFormatter
    },
    {
      headerName: "Opened Time",
      field: "open_timestamp",
      width: 300,
      valueFormatter: this.timeFormatter,
    },
    {
      headerName: "Closed Date",
      field: "close_timestamp",
      width: 300,
      valueFormatter: this.dateFormatter
    },
    {
      headerName: "Closed Time",
      field: "close_timestamp",
      width: 300,
      valueFormatter: this.timeFormatter,
    },
    {
      headerName: "Position",
      field: "position",
      width: 300
    },
    {
      headerName: "Rating",
      field: "rating",
      width: 300
    },
  ];
  tradelogGridApi: any;
  tradelogGridColumnApi: any;
  tradelogGridOptions: GridOptions<any> | undefined;

  constructor(private selectedAccountService: SelectedAccountService, private appService: AppService, private router: Router) {
    this.tradelogGridOptions = {
      onRowClicked: this.onRowClicked.bind(this)
    };
  }

  ngOnInit(): void {

    this.selectedAccountService.getSelectedAccount().subscribe({
      next: response => {
        if (response != null) {
          this.accountID = response.accountID;
          console.log(this.accountID);
          this.getOpenTradesOnAccountChange();
        }
      },
      error: error => {
        console.log("Error fetching selected account:", error);
      }
    });
  }

  getOpenTradesOnAccountChange() {
    this.appService.getAllClosedTrades(this.accountID).subscribe({
      next: response => {
        if (response.data) {
          response.data.forEach((element: any) => {
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
          this.tradeMetrics.totalTrades = response.data.length;
          this.tradeMetrics.expectancy /= this.tradeMetrics.totalTrades;
          this.tradeMetrics.profitFactor = (this.tradeMetrics.grossProfit / this.tradeMetrics.grossLoss);
          this.tradeMetrics.avgHoldingTime /= this.tradeMetrics.totalTrades;
          this.tradeMetrics.winPercentage = (this.tradeMetrics.totalWinner / this.tradeMetrics.totalTrades) * 100;
          console.log(this.tradeMetrics);
          this.closedTradeRowData = response.data;
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onRowClicked(event: any): void {
    let rowData: any;
    rowData = event.data;
    this.router.navigate(['individualTrade'], { queryParams: rowData });
  }

  onTradelogGridReady(params: any) {
    this.tradelogGridParam = params;
    this.tradelogGridApi = params.api;
    this.tradelogGridColumnApi = params.columnApi;
    this.tradelogGridApi.sizeColumnsToFit();
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
}
