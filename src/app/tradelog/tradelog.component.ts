import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, GridOptions } from 'ag-grid-community';
import { SelectedAccountService } from '../shared/service/selected-account-service';
import { AppService } from '../shared/service/app.service';

@Component({
  selector: 'app-tradelog',
  templateUrl: './tradelog.component.html',
  styleUrls: ['./tradelog.component.css']
})
export class TradelogComponent implements OnInit {
  tradelogGridParam: any;
  ClosedTradeRowData: any = [];
  openTradeRowData: any = [];
  accountID: string = '';

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
      headerName: "ISIN",
      field: "isin",
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
    },
    {
      headerName: "Opened Time",
      field: "open_timestamp",
      width: 300
    },
    {
      headerName: "Closed Time",
      field: "close_timestamp",
      width: 300
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

  constructor(private selectedAccountService: SelectedAccountService, private appService: AppService) { }

  ngOnInit(): void {

    this.selectedAccountService.getSelectedAccount().subscribe({
      next: response => {
        if (response != null) {
          this.accountID = response.accountID;
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
          this.ClosedTradeRowData = response.data;
          console.log(response);
        }

      },
      error: error => {
        console.log(error);
      }
    });
  }

  onTradelogGridReady(params: any) {
    this.tradelogGridParam = params;
    this.tradelogGridApi = params.api;
    this.tradelogGridColumnApi = params.columnApi;
    this.tradelogGridApi.sizeColumnsToFit();
  }



}
