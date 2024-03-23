import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community';
import { TradeService } from '../shared/service/trade.service';

@Component({
  selector: 'app-tradelog',
  templateUrl: './tradelog.component.html',
  styleUrls: ['./tradelog.component.css']
})
export class TradelogComponent implements OnInit {

  selectedTradeType: 'closed' | 'open' = 'closed';

  closedTradeColDefs: ColDef[] = [
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
      valueFormatter: this.tradeService.currencyFormatter,
    },
    {
      headerName: "Sell Price",
      field: "avg_sell_price",
      width: 300,
      valueFormatter: this.tradeService.currencyFormatter,
    },
    {
      headerName: "Profit/Loss %",
      field: "profit_percentage",
      width: 300,
      valueFormatter: this.tradeService.percentFormatter,
    },
    {
      headerName: "R-Multiple",
      field: "r_multiple",
      width: 300,
      valueFormatter: this.tradeService.numberFormatter,
    },
    {
      headerName: "Holding time",
      field: "holding_time",
      width: 300,
      valueFormatter: this.tradeService.holdingTimeFormatter,
    },
    {
      headerName: "Opened Date",
      field: "open_timestamp",
      width: 300,
      valueFormatter: this.tradeService.dateFormatter
    },
    {
      headerName: "Opened Time",
      field: "open_timestamp",
      width: 300,
      valueFormatter: this.tradeService.timeFormatter,
    },
    {
      headerName: "Closed Date",
      field: "close_timestamp",
      width: 300,
      valueFormatter: this.tradeService.dateFormatter
    },
    {
      headerName: "Closed Time",
      field: "close_timestamp",
      width: 300,
      valueFormatter: this.tradeService.timeFormatter,
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
  openTradeColDefs: ColDef[] = [
    {
      headerName: "Symbol",
      field: "symbol",
      width: 300
    },
    {
      headerName: "Total Buy Quantity",
      field: "total_buy_quantity",
      width: 300
    },
    {
      headerName: "Total Sell Quantity",
      field: "total_sell_quantity",
      width: 300
    },
    {
      headerName: "Total Buy Price",
      field: "total_buy_price",
      width: 300,
      valueFormatter: this.tradeService.currencyFormatter,
    },
    {
      headerName: "Total Sell Price",
      field: "total_sell_price",
      width: 300,
      valueFormatter: this.tradeService.currencyFormatter,
    },
    {
      headerName: "Profit/Loss %",
      field: "profit_percentage",
      width: 300,
      valueFormatter: this.tradeService.percentFormatter,
    },
    {
      headerName: "R-Multiple",
      field: "r_multiple",
      width: 300,
      valueFormatter: this.tradeService.numberFormatter,
    },
    {
      headerName: "Holding time",
      field: "holding_time",
      width: 300,
      valueFormatter: this.tradeService.holdingTimeFormatter,
    },
    {
      headerName: "Opened Date",
      field: "timestamp",
      width: 300,
      valueFormatter: this.tradeService.dateFormatter
    },
    {
      headerName: "Opened Time",
      field: "timestamp",
      width: 300,
      valueFormatter: this.tradeService.timeFormatter,
    },
    {
      headerName: "Position",
      field: "position",
      width: 300
    },
  ];


  constructor(protected tradeService: TradeService) {
  }

  ngOnInit(): void {
  }

  selectTradeType(tradeType: 'closed' | 'open'): void {
    this.selectedTradeType = tradeType;
  }
}
