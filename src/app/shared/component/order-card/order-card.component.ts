import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../interfaces/transaction';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() transaction: Transaction = new Transaction();
  isExpanded: boolean = false;


  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

}
