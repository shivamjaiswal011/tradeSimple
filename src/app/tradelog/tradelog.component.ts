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
      headerName: "ID",
      field: "id",
      width: 300
    },
    {
      headerName: "Name",
      field: "name",
      width: 300
    },
    {
      headerName: "Age",
      field: "age",
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
      this.rowData.push({ id: index, name: 'John' + index, age: 25 + index })

    }
  }

  onTradelogGridReady(params: any) {
    this.tradelogGridParam = params;
    this.tradelogGridApi = params.api;
    this.tradelogGridColumnApi = params.columnApi;
    this.tradelogGridApi.sizeColumnsToFit();
  }



}
