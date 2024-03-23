import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, GridOptions } from 'ag-grid-community';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { HoldingTimePipe } from '../shared/pipes/holding-time.pipe';
import { CurrencyPipe } from '../shared/pipes/currency.pipe';
import { RoundPipe } from '../shared/pipes/round.pipe';
import { TradeService } from '../shared/service/trade.service';

@Component({
  selector: 'app-tradelog',
  templateUrl: './tradelog.component.html',
  styleUrls: ['./tradelog.component.css']
})
export class TradelogComponent implements OnInit {
  tradelogGridParam: any;
  selectedTradeType: 'closed' | 'open' = 'closed';
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

  constructor(private router: Router, protected tradeService: TradeService) {
    this.tradelogGridOptions = {
      onRowClicked: this.onRowClicked.bind(this)
    };
  }

  ngOnInit(): void {


  }

  getOpenTradesOnAccountChange() {

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

  selectTradeType(tradeType: 'closed' | 'open'): void {
    this.selectedTradeType = tradeType;
  }
}
