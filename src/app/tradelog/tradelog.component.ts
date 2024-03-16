import { ClosedTrade } from './../shared/interfaces/closed-trade';
import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef, GridOptions } from 'ag-grid-community';
import { SelectedAccountService } from '../shared/service/selected-account-service';
import { AppService } from '../shared/service/app.service';
import { Router } from '@angular/router';

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
          let rowData: any = [];
          response.data.forEach((element: any) => {
            const tradeInfo = {
              account_id: String,
              trade_id: String,
              quantity: Number,
              open_timestamp: Date,
              close_timestamp: Date,
              one_r: Number,
              rating: Number,
              avg_buy_price: Number,
              avg_sell_price: Number,
              isin: String,
              position: String,
              symbol: String,
              sector_name: String,
              industry: String,
              industry_new_name: String,
              igroup_name: String,
              company_name: String,
              net_profit: Number,
              r_multiple: Number,
            }

            tradeInfo.account_id = element.ClosedTrade.account_id;
            tradeInfo.trade_id = element.ClosedTrade.trade_id;
            tradeInfo.quantity = element.ClosedTrade.quantity;
            tradeInfo.open_timestamp = element.ClosedTrade.open_timestamp;
            tradeInfo.close_timestamp = element.ClosedTrade.close_timestamp;
            tradeInfo.one_r = element.ClosedTrade.one_r;
            tradeInfo.rating = element.ClosedTrade.rating;
            tradeInfo.avg_buy_price = element.ClosedTrade.avg_buy_price;
            tradeInfo.avg_sell_price = element.ClosedTrade.avg_sell_price;
            tradeInfo.isin = element.ClosedTrade.isin;
            tradeInfo.position = element.ClosedTrade.position;
            tradeInfo.symbol = element.EquityList.symbol;
            tradeInfo.sector_name = element.EquityList.sector_name;
            tradeInfo.industry = element.EquityList.industry;
            tradeInfo.industry_new_name = element.EquityList.industry_new_name;
            tradeInfo.igroup_name = element.EquityList.igroup_name;
            tradeInfo.company_name = element.EquityList.company_name;
            rowData.push(tradeInfo);
          });
          console.log(rowData);
          this.closedTradeRowData = rowData;
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



}
