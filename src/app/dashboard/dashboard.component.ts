import { Component, OnInit } from '@angular/core';
import { TradeService } from '../shared/service/trade.service';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedTradeType: 'closed' | 'open' = 'closed';
  constructor(protected tradeService: TradeService) { }

  ngOnInit(): void {
  }

  selectTradeType(tradeType: 'closed' | 'open'): void {
    this.selectedTradeType = tradeType;
  }

  closedTradeColDefs: ColDef[] = [
    {
      headerName: "Symbol",
      field: "symbol",
      width: 300
    },
    {
      headerName: "Position",
      field: "position",
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
      headerName: "Position",
      field: "position",
      width: 300
    },
  ];

}
