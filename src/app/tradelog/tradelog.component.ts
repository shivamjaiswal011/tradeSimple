import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-tradelog',
  templateUrl: './tradelog.component.html',
  styleUrls: ['./tradelog.component.css']
})
export class TradelogComponent implements OnInit {
  tradelogGridParam: any;
  rowData: any = [];
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
      width: 300
    },
    {
      headerName: "Sell Price",
      field: "avg_sell_price",
      width: 300
    },
    {
      headerName: "Profit/Loss",
      field: "net_profit",
      width: 300
    },
    {
      headerName: "R-Multiple",
      field: "r_multiple",
      width: 300
    }
  ];
  tradelogGridApi: any;
  tradelogGridColumnApi: any;
  tradelogGridOptions: GridOptions<any> | undefined;

  constructor() { }

  ngOnInit(): void {

    // Define dummy data
    for (let index = 0; index < 100; index++) {
      this.rowData.push({
        symbol: 'Relience', quantity: 30 + index + Math.random(), avg_buy_price: 25 + index + Math.random(),
        avg_sell_price: 15 + index + Math.random(), net_profit: Math.random(), r_multiple: 0.0 + Math.random()
      });

    }
  }

  onTradelogGridReady(params: any) {
    this.tradelogGridParam = params;
    this.tradelogGridApi = params.api;
    this.tradelogGridColumnApi = params.columnApi;
    this.tradelogGridApi.sizeColumnsToFit();
  }



}
